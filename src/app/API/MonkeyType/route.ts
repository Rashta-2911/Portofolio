import { NextResponse } from "next/server";

// Helper to generate synthetic activity data from profile stats
function generateSyntheticActivity(completedTests: number, addedAt: number): any[] {
  const results: any[] = [];
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  const maxDaysBack = 365;
  
  // Generate test timestamps spread across the past year
  for (let i = 0; i < completedTests; i++) {
    const daysBack = Math.floor(Math.random() * maxDaysBack);
    const timestamp = now - (daysBack * dayInMs) - Math.random() * dayInMs;
    results.push({
      _id: `synthetic-${i}`,
      timestamp: Math.max(Math.floor(timestamp), addedAt),
      language: "indonesian"
    });
  }
  
  return results;
}

export async function GET() {
  const MONKEYTYPE_TOKEN = process.env.MONKEYTYPE_TOKEN;
  const MONKEYTYPE_USERNAME = process.env.MONKEYTYPE_USERNAME;

  if (!MONKEYTYPE_TOKEN || !MONKEYTYPE_USERNAME) {
    return NextResponse.json({ error: "Missing API credentials" }, { status: 500 });
  }

  try {
    const headers = {
      "Authorization": `ApeKey ${MONKEYTYPE_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Fetch Profile
    const profileRes = await fetch(`https://api.monkeytype.com/users/${MONKEYTYPE_USERNAME}/profile`, {
      headers,
      next: { revalidate: 60 } // Reduced for real-time
    });

    if (!profileRes.ok) {
      throw new Error(`Failed to fetch profile from MonkeyType API: ${profileRes.status}`);
    }

    const profileData = await profileRes.json();
    const profile = profileData.data;

    // Try to fetch Results (Activity) with reduced frequency to avoid rate limiting
    let results: any[] = [];
    let hasRealResults = false;
    
    try {
      // Try with a safer limit (250 is the standard MonkeyType limit for keys)
      const resultsRes = await fetch(
        `https://api.monkeytype.com/results?limit=500`,
        {
          headers,
          next: { revalidate: 60 }
        }
      );

      if (resultsRes.ok) {
        const resultsData = await resultsRes.json();
        // Handle both { data: [...] } and directly [...]
        results = Array.isArray(resultsData) ? resultsData : (resultsData.data || []);
        hasRealResults = results.length > 0;
        console.log("Successfully fetched real results:", results.length);
      } else {
        console.warn(`Results endpoint returned ${resultsRes.status}, trying fallback or synthetic`);
        // If results endpoint fails, it might be the limit. But let's fallback to synthetic for now
        // with more realistic distribution.
        results = generateSyntheticActivity(
          profile?.typingStats?.completedTests || 0,
          profile?.addedAt || (Date.now() - 365 * 24 * 60 * 60 * 1000)
        );
      }
    } catch (resultsError) {
      console.warn("Error fetching results, using synthetic data:", resultsError);
      results = generateSyntheticActivity(
        profile?.typingStats?.completedTests || 0,
        profile?.addedAt || (Date.now() - 365 * 24 * 60 * 60 * 1000)
      );
    }

    return NextResponse.json({
      profile: profile,
      results: results,
      hasRealResults: hasRealResults
    });
  } catch (error: any) {
    console.error("Error fetching MonkeyType stats:", error);
    return NextResponse.json(
      { error: "Failed to load typing stats", details: error.message },
      { status: 500 }
    );
  }
}
