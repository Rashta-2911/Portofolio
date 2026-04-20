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
      next: { revalidate: 3600 } // Cache for 1 hour
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
      const resultsRes = await fetch(
        `https://api.monkeytype.com/results?limit=50&offset=0`,
        {
          headers,
          next: { revalidate: 3600 } // Cache for 1 hour to avoid rate limiting
        }
      );

      if (resultsRes.ok) {
        const resultsData = await resultsRes.json();
        results = resultsData.data || [];
        hasRealResults = results.length > 0;
        console.log("Successfully fetched real results:", results.length);
      } else {
        console.warn(`Results endpoint returned ${resultsRes.status}, using synthetic data`);
        // Fallback to synthetic data if rate limited or unavailable
        results = generateSyntheticActivity(
          profile?.typingStats?.completedTests || 0,
          profile?.addedAt || Date.now()
        );
      }
    } catch (resultsError) {
      console.warn("Error fetching results, using synthetic data:", resultsError);
      // Fallback to synthetic data
      results = generateSyntheticActivity(
        profile?.typingStats?.completedTests || 0,
        profile?.addedAt || Date.now()
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
