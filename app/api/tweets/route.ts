import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || "@monad_xyz"
    const maxResults = Math.min(Number.parseInt(searchParams.get("maxResults") || "20"), 100)

    // Get credentials from environment variables
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    if (!apiKey || !apiSecret) {
      console.error("Twitter API credentials not found")
      return NextResponse.json(
        {
          error: "Twitter API credentials not configured",
          message: "Please add TWITTER_API_KEY and TWITTER_API_SECRET to your environment variables",
        },
        { status: 500 },
      )
    }

    console.log("Using Twitter API credentials...")
    console.log("API Key:", apiKey.substring(0, 10) + "...")
    console.log("Has Access Token:", !!accessToken)

    // Try OAuth 2.0 Bearer Token method first
    console.log("Attempting OAuth 2.0 authentication...")

    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")

    const tokenResponse = await fetch("https://api.twitter.com/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("OAuth 2.0 authentication failed:", tokenResponse.status, errorText)
      return NextResponse.json(
        {
          error: "Authentication failed",
          message: "Failed to authenticate with Twitter API",
          details: errorText,
          status: tokenResponse.status,
        },
        { status: tokenResponse.status },
      )
    }

    const tokenData = await tokenResponse.json()
    const bearerToken = tokenData.access_token

    if (!bearerToken) {
      console.error("No bearer token received")
      return NextResponse.json({ error: "No bearer token received from Twitter API" }, { status: 500 })
    }

    console.log("Successfully authenticated with Twitter API")

    // Search for tweets
    const params = new URLSearchParams({
      query: query,
      max_results: maxResults.toString(),
      "tweet.fields": "created_at,author_id,public_metrics,context_annotations",
      "user.fields": "name,username,profile_image_url,verified,public_metrics",
      expansions: "author_id",
    })

    console.log(`Searching for tweets: ${query}`)

    const searchResponse = await fetch(`https://api.twitter.com/2/tweets/search/recent?${params}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error("Tweet search failed:", searchResponse.status, errorText)

      if (searchResponse.status === 403) {
        return NextResponse.json(
          {
            error: "Access forbidden",
            message: "Your Twitter API access level doesn't include search functionality",
            details: "You may need to upgrade to Twitter API Basic ($100/month) or higher",
            suggestion: "Check your Twitter Developer Portal for API access level",
          },
          { status: 403 },
        )
      }

      if (searchResponse.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: "Too many requests to Twitter API",
            details: "Please wait 15 minutes before trying again",
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          error: `Twitter API error: ${searchResponse.status}`,
          message: errorText,
        },
        { status: searchResponse.status },
      )
    }

    const searchData = await searchResponse.json()
    console.log("Search successful:", searchData.meta?.result_count || 0, "tweets found")

    return NextResponse.json(searchData)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
