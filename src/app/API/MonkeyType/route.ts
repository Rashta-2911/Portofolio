import { NextResponse } from "next/server";

let monkeyCache: {
  data: any;
  timestamp: number;
} | null = null;

// Perpanjang TTL Cache menjadi 30 Menit untuk menghindari Rate Limit
const CACHE_TTL = 30 * 60 * 1000;

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
  // Mengembalikan cache jika belum expired
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
      fetch(`https://api.monkeytype.com/users/personalBests?mode=time`, {
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`https://api.monkeytype.com/users/personalBests?mode=words`, {
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`https://api.monkeytype.com/results?limit=100&offset=0`, {
        headers: authHeaders,
        cache: "no-store",
      }),
    ]);

    // Jika ada request yang kena Rate Limit (HTTP 429)
    if ([statsRes, pbTimeRes, pbWordsRes, resultsRes].some((r) => r.status === 429)) {
      console.warn("[MonkeyType] ApeKey Rate limited!");
      if (monkeyCache) {
        // Paksa perpanjang timestamp cache agar tidak spam fetch saat rate limit
        monkeyCache.timestamp = now;
        return NextResponse.json({ ...monkeyCache.data, fromCache: true, isRateLimited: true });
      }
      return NextResponse.json({ error: "Rate limited by MonkeyType API" }, { status: 429 });
    }

    // Process Stats
    let typingStats = null;
    if (statsRes.ok) {
      const d = await statsRes.json();
      typingStats = d.data ?? d;
    }

    // Process Results
    let results: any[] = [];
    if (resultsRes.ok) {
      const d = await resultsRes.json();
      results = Array.isArray(d) ? d : (d.data ?? []);
    }

    // Process Personal Bests
    let personalBests = null;
    if (pbTimeRes.ok) {
      const d = await pbTimeRes.json();
      const timeData = d.data ?? d;

      let wordsData: Record<string, any> = {};
      if (pbWordsRes.ok) {
        const dw = await pbWordsRes.json();
        wordsData = dw.data ?? dw;
      }

      personalBests = { ...timeData, words: wordsData };
    } else if (results.length > 0) {
      personalBests = extractPbFromResults(results);
    }

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