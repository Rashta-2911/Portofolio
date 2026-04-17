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

    // Fetch Results (Activity)
    const resultsRes = await fetch(`https://api.monkeytype.com/results`, {
      headers,
      next: { revalidate: 60 }
    });

    if (!profileRes.ok || !resultsRes.ok) {
      throw new Error(`Failed to fetch from MonkeyType API`);
    }

    const profileData = await profileRes.json();
    const resultsData = await resultsRes.json();

    return NextResponse.json({
      profile: profileData.data,
      results: resultsData.data
    });
  } catch (error: any) {
    console.error("Error fetching MonkeyType stats:", error);
    return NextResponse.json(
      { error: "Failed to load typing stats", details: error.message },
      { status: 500 }
    );
  }
}
