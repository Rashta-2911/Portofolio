import { NextResponse } from "next/server";

export async function GET() {
  const MONKEYTYPE_TOKEN = process.env.MONKEYTYPE_TOKEN;
  const MONKEYTYPE_USERNAME = process.env.MONKEYTYPE_USERNAME;

  if (!MONKEYTYPE_TOKEN || !MONKEYTYPE_USERNAME) {
    return NextResponse.json(
      { error: "Missing API credentials" },
      { status: 500 }
    );
  }

  const authHeaders = {
    Authorization: `ApeKey ${MONKEYTYPE_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    // Profile publik — tidak butuh auth header
    const profileRes = await fetch(
      `https://api.monkeytype.com/users/${MONKEYTYPE_USERNAME}/profile`,
      { cache: "no-store" }
    );

    if (!profileRes.ok) {
      throw new Error(`Profile fetch failed: ${profileRes.status}`);
    }

    const profileData = await profileRes.json();
    const profile = profileData.data;

    // Results — butuh auth, limit max 100
    let results: any[] = [];
    let hasRealResults = false;

    const resultsRes = await fetch(
      `https://api.monkeytype.com/results?limit=100`,
      {
        headers: authHeaders,
        cache: "no-store",
      }
    );

    if (resultsRes.ok) {
      const resultsData = await resultsRes.json();
      results = Array.isArray(resultsData)
        ? resultsData
        : resultsData.data ?? [];
      hasRealResults = results.length > 0;
    } else {
      console.warn(`Results endpoint returned: ${resultsRes.status}`);
      // Kembalikan array kosong — jangan generate data palsu
      results = [];
    }

    return NextResponse.json({ profile, results, hasRealResults });

  } catch (error: any) {
    console.error("MonkeyType API error:", error);
    return NextResponse.json(
      { error: "Failed to load typing stats", details: error.message },
      { status: 500 }
    );
  }
}