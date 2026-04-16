import { graphql as graphqlRequest } from "@octokit/graphql"

const token = process.env.GITHUB_TOKEN

export async function getGitHubStats() {
  const username = process.env.GITHUB_USERNAME as string

  if (!token || !username) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_USERNAME environment variables")
  }

  const graphql = graphqlRequest.defaults({
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  try {
    const result: any = await graphql(`
      query ($login: String!) {
        user(login: $login) {
          followers {
            totalCount
          }
          repositories {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `, {
      login: username,
    })

    return {
      followers: result.user.followers.totalCount,
      repos: result.user.repositories.totalCount,
      contributions: result.user.contributionsCollection.contributionCalendar.totalContributions,
      weeks: result.user.contributionsCollection.contributionCalendar.weeks,
    }
  } catch (error) {
    console.error("GitHub API error:", error)
    throw error
  }
}