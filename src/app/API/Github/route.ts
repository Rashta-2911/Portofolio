export const runtime = "nodejs"
import { getGitHubStats } from "@/lib/github"


export async function GET() {
  try {
    const data = await getGitHubStats()
    return Response.json(data)
  } catch (error) {
    console.error("API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch GitHub stats"
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}