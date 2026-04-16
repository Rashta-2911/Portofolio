export const runtime = "nodejs"
import { getGitHubStats } from "@/lib/github"


export async function GET() {
  try {
    const data = await getGitHubStats()
    return Response.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return Response.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    )
  }
}