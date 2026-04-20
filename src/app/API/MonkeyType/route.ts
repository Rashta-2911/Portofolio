import { NextResponse } from "next/server";

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
      next: { revalidate: 60 }
    });

    if (!profileRes.ok) {
      throw new Error(`Failed to fetch profile from MonkeyType API: ${profileRes.status}`);
    }

    const profileData = await profileRes.json();

    // Fetch Results (Activity) - with limit parameter
    let resultsData = { data: [] };
    try {
      const resultsRes = await fetch(`https://api.monkeytype.com/results?limit=100`, {
        headers,
        next: { revalidate: 60 }
      });

      if (resultsRes.ok) {
        resultsData = await resultsRes.json();
      } else {
        console.warn(`Failed to fetch results: ${resultsRes.status}`);
      }
    } catch (resultsError) {
      console.warn("Error fetching results, continuing with profile data only:", resultsError);
    }

    return NextResponse.json({
      profile: profileData.data,
      results: resultsData.data || []
    });
  } catch (error: any) {
    console.error("Error fetching MonkeyType stats:", error);
    return NextResponse.json(
      { error: "Failed to load typing stats", details: error.message },
      { status: 500 }
    );
  }
}
