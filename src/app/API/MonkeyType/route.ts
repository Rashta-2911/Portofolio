import { NextResponse } from "next/server";

let monkeyCache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_TTL = 15 * 60 * 1000;

function groupByDate(results: any[]) {
  const grouped: Record<string, number> = {};
  results.forEach((result) => {
    const ts = result.timestamp < 10000000000 ? result.timestamp * 1000 : result.timestamp;
    const date = new Date(ts);
    const key = date.toISOString().split("T")[0];
    grouped[key] = (grouped[key] || 0) + 1;
  });
  return grouped;
}

function fillMissingDates(
  grouped: Record<string, number>,
  days: number = 365
): { date: string; count: number }[] {
  const result = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const key = date.toISOString().split("T")[0];
    result.push({ date: key, count: grouped[key] || 0 });
  }
  return result;
}

// Fallback: hitung personal best dari array results jika API PB gagal
function extractPbFromResults(results: any[]) {
  const timeKeys = ["15", "30", "60", "120"];
  const wordKeys = ["10", "25", "50", "100"];
  const timePb: Record<string, any[]> = {};
  const wordsPb: Record<string, any[]> = {};

  results.forEach((r) => {
    if (r.mode === "time" && timeKeys.includes(r.mode2)) {
      const key = r.mode2;
      if (!timePb[key] || r.wpm > timePb[key][0].wpm) {
        timePb[key] = [{ wpm: r.wpm, acc: r.acc, consistency: r.consistency, timestamp: r.timestamp }];
      }
    }
    if (r.mode === "words" && wordKeys.includes(r.mode2)) {
      const key = r.mode2;
      if (!wordsPb[key] || r.wpm > wordsPb[key][0].wpm) {
        wordsPb[key] = [{ wpm: r.wpm, acc: r.acc, consistency: r.consistency, timestamp: r.timestamp }];
      }
    }
  });

  return { ...timePb, words: wordsPb };
}

export async function GET() {
  const MONKEYTYPE_TOKEN = process.env.MONKEYTYPE_TOKEN;
  const MONKEYTYPE_USERNAME = process.env.MONKEYTYPE_USERNAME;

  if (!MONKEYTYPE_TOKEN || !MONKEYTYPE_USERNAME) {
    return NextResponse.json(
      { error: "Missing API credentials" },
      { status: 500 }
    );
  }

  const now = Date.now();
  if (monkeyCache && now - monkeyCache.timestamp < CACHE_TTL) {
    return NextResponse.json({ ...monkeyCache.data, fromCache: true });
  }

  const authHeaders: HeadersInit = {
    Authorization: `ApeKey ${MONKEYTYPE_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    console.log("[MonkeyType] Fetching fresh data...");

    const [statsRes, pbTimeRes, pbWordsRes, resultsRes] = await Promise.all([
      fetch(`https://api.monkeytype.com/users/stats`, {
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`https://api.monkeytype.com/users/personalBests?mode=time&difficulty=normal`, {
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`https://api.monkeytype.com/users/personalBests?mode=words&difficulty=normal`, {
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`https://api.monkeytype.com/results?limit=100&offset=0`, {
        headers: authHeaders,
        cache: "no-store",
      }),
    ]);

    console.log("[MonkeyType] Status:", {
      stats: statsRes.status,
      pbTime: pbTimeRes.status,
      pbWords: pbWordsRes.status,
      results: resultsRes.status,
    });

    // Rate limit
    if ([statsRes, pbTimeRes, pbWordsRes, resultsRes].some((r) => r.status === 429)) {
      console.warn("[MonkeyType] Rate limited!");
      if (monkeyCache) {
        return NextResponse.json({ ...monkeyCache.data, fromCache: true, isRateLimited: true });
      }
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    // Stats
    let typingStats = null;
    if (statsRes.ok) {
      const d = await statsRes.json();
      typingStats = d.data ?? d;
    } else {
      const t = await statsRes.text();
      console.warn("[MonkeyType] stats failed:", statsRes.status, t);
    }

    // Results dulu — diperlukan untuk fallback PB
    let results: any[] = [];
    if (resultsRes.ok) {
      const d = await resultsRes.json();
      results = Array.isArray(d) ? d : (d.data ?? []);
      console.log("[MonkeyType] results count:", results.length);
    } else {
      const t = await resultsRes.text();
      console.warn("[MonkeyType] results failed:", resultsRes.status, t);
    }

    // Personal bests — coba dari API dulu, fallback ke results
    let personalBests = null;
    if (pbTimeRes.ok) {
      const d = await pbTimeRes.json();
      const timeData = d.data ?? d;
      console.log("[MonkeyType] pbTime raw:", JSON.stringify(timeData));

      let wordsData: Record<string, any> = {};
      if (pbWordsRes.ok) {
        const dw = await pbWordsRes.json();
        wordsData = dw.data ?? dw;
        console.log("[MonkeyType] pbWords raw:", JSON.stringify(wordsData));
      } else {
        const t = await pbWordsRes.text();
        console.warn("[MonkeyType] pbWords failed:", pbWordsRes.status, t);
      }

      personalBests = { ...timeData, words: wordsData };
    } else {
      const t = await pbTimeRes.text();
      console.warn("[MonkeyType] pbTime failed:", pbTimeRes.status, t);

      // Fallback: hitung PB dari results yang sudah ada
      if (results.length > 0) {
        console.log("[MonkeyType] Using fallback PB from results...");
        personalBests = extractPbFromResults(results);
      }
    }

    console.log("[MonkeyType] personalBests:", JSON.stringify(personalBests));

    const grouped = groupByDate(results);
    const activityByDate = fillMissingDates(grouped, 365);

    const profile = {
      name: MONKEYTYPE_USERNAME,
      typingStats,
      personalBests,
    };

    const finalData = {
      profile,
      results,
      hasRealResults: results.length > 0,
      activityByDate,
      isRateLimited: false,
    };

    if (typingStats || personalBests || results.length > 0) {
      monkeyCache = { data: finalData, timestamp: now };
      console.log("[MonkeyType] Cache updated.");
    }

    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("[MonkeyType] Error:", error);
    if (monkeyCache) {
      return NextResponse.json({ ...monkeyCache.data, isError: true });
    }
    return NextResponse.json(
      { error: "Failed to load typing stats", details: error.message },
      { status: 500 }
    );
  }
}