// X API integration for fetching tweets
interface XAPITweet {
  id: string
  text: string
  created_at: string
  author_id: string
  public_metrics: {
    retweet_count: number
    like_count: number
    reply_count: number
    impression_count: number
  }
  context_annotations?: Array<{
    domain: { name: string }
    entity: { name: string }
  }>
}

interface XAPIUser {
  id: string
  name: string
  username: string
  profile_image_url: string
  verified: boolean
  public_metrics: {
    followers_count: number
  }
}

interface XAPIResponse {
  data: XAPITweet[]
  includes?: {
    users: XAPIUser[]
  }
  meta: {
    result_count: number
    next_token?: string
  }
}

class XAPIClient {
  private bearerToken: string
  private baseURL = "https://api.twitter.com/2"

  constructor(bearerToken: string) {
    this.bearerToken = bearerToken
  }

  async searchTweets(query: string, maxResults = 100): Promise<XAPIResponse> {
    // In a real implementation, this would make an actual API call
    // For demo purposes, we'll return mock data that matches X API structure

    try {
      // Simulated API call - replace with actual fetch in production
      const mockResponse: XAPIResponse = {
        data: [
          {
            id: "1745123456789012345",
            text: "Excited to share more details about @monad_xyz's parallel execution architecture. We're seeing 10,000+ TPS in our latest benchmarks with full EVM compatibility. The future of blockchain scalability is here! 🚀 #MonadLabs #Blockchain",
            created_at: "2024-01-10T14:30:00.000Z",
            author_id: "123456789",
            public_metrics: {
              retweet_count: 456,
              like_count: 1247,
              reply_count: 123,
              impression_count: 15600,
            },
          },
          {
            id: "1745098765432109876",
            text: "Interesting approach by @monad_xyz on parallel execution. The consensus mechanism looks promising for maintaining decentralization while achieving high throughput. Looking forward to seeing how it performs at scale.",
            created_at: "2024-01-10T12:30:00.000Z",
            author_id: "987654321",
            public_metrics: {
              retweet_count: 2341,
              like_count: 8934,
              reply_count: 567,
              impression_count: 89400,
            },
          },
        ],
        includes: {
          users: [
            {
              id: "123456789",
              name: "Keone Hon",
              username: "keone_hon",
              profile_image_url: "https://pbs.twimg.com/profile_images/example1.jpg",
              verified: true,
              public_metrics: {
                followers_count: 45200,
              },
            },
            {
              id: "987654321",
              name: "Vitalik Buterin",
              username: "VitalikButerin",
              profile_image_url: "https://pbs.twimg.com/profile_images/example2.jpg",
              verified: true,
              public_metrics: {
                followers_count: 5200000,
              },
            },
          ],
        },
        meta: {
          result_count: 2,
          next_token: "next_page_token_here",
        },
      }

      return mockResponse

      // Real implementation would look like this:
      /*
      const params = new URLSearchParams({
        query: query,
        'max_results': maxResults.toString(),
        'tweet.fields': 'created_at,author_id,public_metrics,context_annotations',
        'user.fields': 'name,username,profile_image_url,verified,public_metrics',
        'expansions': 'author_id'
      })

      const response = await fetch(`${this.baseURL}/tweets/search/recent?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`X API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
      */
    } catch (error) {
      console.error("Error fetching tweets:", error)
      throw error
    }
  }

  async getTweetsByIds(ids: string[]): Promise<XAPIResponse> {
    // Similar implementation for fetching specific tweets
    const mockResponse: XAPIResponse = {
      data: [],
      meta: { result_count: 0 },
    }
    return mockResponse
  }
}

export { XAPIClient, type XAPITweet, type XAPIUser, type XAPIResponse }
