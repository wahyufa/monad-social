// This is a server-side route handler that securely exchanges your API credentials for a bearer token
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // These should be environment variables, not hardcoded
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "Twitter API credentials not configured" }, { status: 500 })
    }

    // Base64 encode the credentials
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")

    // Exchange credentials for bearer token
    const response = await fetch("https://api.twitter.com/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Twitter API authentication error:", error)
      return NextResponse.json({ error: "Failed to authenticate with Twitter API" }, { status: response.status })
    }

    const data = await response.json()

    // Return the bearer token to the client
    // In production, you might want to store this securely and not expose it directly
    return NextResponse.json({
      access_token: data.access_token,
      token_type: data.token_type,
    })
  } catch (error) {
    console.error("Error authenticating with Twitter:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
