// Twitter API client with improved error handling and rate limiting
import crypto from "crypto"

interface TwitterCredentials {
  apiKey: string
  apiSecret: string
  accessToken?: string
  accessTokenSecret?: string
}

interface TwitterError {
  title: string
  detail: string
  type: string
}

interface TwitterErrorResponse {
  errors: TwitterError[]
}

export class TwitterClient {
  private credentials: TwitterCredentials
  private bearerToken: string | null = null
  private lastRequestTime = 0
  private minRequestInterval = 1000 // 1 second between requests

  constructor(credentials: TwitterCredentials) {
    this.credentials = credentials
  }

  // Rate limiting helper
  private async waitForRateLimit() {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest
      console.log(`Rate limiting: waiting ${waitTime}ms before next request`)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
    this.lastRequestTime = Date.now()
  }

  // Enhanced error handling
  private async handleApiResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type")

    if (!response.ok) {
      let errorMessage = `Twitter API error: ${response.status} ${response.statusText}`

      try {
        if (contentType && contentType.includes("application/json")) {
          const errorData: TwitterErrorResponse = await response.json()
          if (errorData.errors && errorData.errors.length > 0) {
            errorMessage = errorData.errors.map((err) => err.detail || err.title).join(", ")
          }
        } else {
          // Handle non-JSON responses (like HTML error pages)
          const errorText = await response.text()
          if (response.status === 429) {
            errorMessage = "Rate limit exceeded. Please wait before making more requests."
          } else if (response.status === 403) {
            errorMessage = "Access forbidden. Please check your API permissions and authentication."
          } else if (errorText.includes("Too Many Requests")) {
            errorMessage = "Rate limit exceeded. Please wait before making more requests."
          } else {
            errorMessage = `${errorMessage}: ${errorText.substring(0, 200)}`
          }
        }
      } catch (parseError) {
        console.error("Error parsing API response:", parseError)
      }

      throw new Error(errorMessage)
    }

    // Parse successful response
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else {
      throw new Error("Expected JSON response but received: " + contentType)
    }
  }

  // OAuth 1.0a authentication for user context requests
  private generateOAuth1Header(method: string, url: string, params: Record<string, string> = {}) {
    if (!this.credentials.accessToken || !this.credentials.accessTokenSecret) {
      throw new Error("Access token and secret are required for OAuth 1.0a")
    }

    const oauth = {
      oauth_consumer_key: this.credentials.apiKey,
      oauth_nonce: crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_token: this.credentials.accessToken,
      oauth_version: "1.0",
    }

    // Combine parameters
    const sigParams = { ...params, ...oauth }

    // Create signature base string
    const paramString = Object.keys(sigParams)
      .sort()
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(sigParams[key])}`)
      .join("&")

    const signatureBaseString = [method.toUpperCase(), encodeURIComponent(url), encodeURIComponent(paramString)].join(
      "&",
    )

    // Create signing key
    const signingKey = [
      encodeURIComponent(this.credentials.apiSecret),
      encodeURIComponent(this.credentials.accessTokenSecret),
    ].join("&")

    // Generate signature
    const signature = crypto.createHmac("sha1", signingKey).update(signatureBaseString).digest("base64")

    // Create authorization header
    const authHeader =
      "OAuth " +
      Object.keys(oauth)
        .map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauth[key])}"`)
        .concat(`oauth_signature="${encodeURIComponent(signature)}"`)
        .join(", ")

    return authHeader
  }

  // OAuth 2.0 authentication for app-only requests
  private async getBearerToken(): Promise<string> {
    if (this.bearerToken) {
      return this.bearerToken
    }

    await this.waitForRateLimit()

    const credentials = Buffer.from(`${this.credentials.apiKey}:${this.credentials.apiSecret}`).toString("base64")

    const response = await fetch("https://api.twitter.com/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    })

    const data = await this.handleApiResponse(response)
    this.bearerToken = data.access_token
    return this.bearerToken
  }

  // Search tweets using user authentication (OAuth 1.0a)
  async searchTweetsWithUserAuth(query: string, maxResults = 10): Promise<any> {
    if (!this.credentials.accessToken || !this.credentials.accessTokenSecret) {
      throw new Error("Access token and secret are required for user authentication")
    }

    await this.waitForRateLimit()

    const url = "https://api.twitter.com/2/tweets/search/recent"
    const params = {
      query,
      max_results: Math.min(maxResults, 10).toString(), // Limit to 10 for rate limiting
      "tweet.fields": "created_at,author_id,public_metrics",
      "user.fields": "name,username,profile_image_url,verified,public_metrics",
      expansions: "author_id",
    }

    // Convert params to query string
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&")

    const fullUrl = `${url}?${queryString}`

    // Generate OAuth 1.0a header
    const authHeader = this.generateOAuth1Header("GET", url, params)

    const response = await fetch(fullUrl, {
      headers: {
        Authorization: authHeader,
        "User-Agent": "MonadSocialMonitor/1.0",
      },
    })

    return await this.handleApiResponse(response)
  }

  // Search tweets using app-only authentication (OAuth 2.0)
  async searchTweetsWithAppAuth(query: string, maxResults = 10): Promise<any> {
    await this.waitForRateLimit()

    const bearerToken = await this.getBearerToken()

    const params = new URLSearchParams({
      query,
      max_results: Math.min(maxResults, 10).toString(), // Limit to 10 for rate limiting
      "tweet.fields": "created_at,author_id,public_metrics",
      "user.fields": "name,username,profile_image_url,verified,public_metrics",
      expansions: "author_id",
    })

    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?${params}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "User-Agent": "MonadSocialMonitor/1.0",
      },
    })

    return await this.handleApiResponse(response)
  }

  // Try both authentication methods, preferring user auth if available
  async searchTweets(query: string, maxResults = 10): Promise<any> {
    try {
      if (this.credentials.accessToken && this.credentials.accessTokenSecret) {
        console.log("Attempting to search tweets with user authentication...")
        return await this.searchTweetsWithUserAuth(query, maxResults)
      } else {
        console.log("Attempting to search tweets with app-only authentication...")
        return await this.searchTweetsWithAppAuth(query, maxResults)
      }
    } catch (error) {
      console.error("Error searching tweets:", error)
      throw error
    }
  }
}
