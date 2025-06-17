"use client"

import { useState, useEffect, useCallback } from "react"
import { generateInitialTweets, generateMockTweet, type Tweet } from "@/lib/mock-data"

interface XAPITweet {
  id: string
  text: string
  created_at: string
  author_id: string
  public_metrics: {
    retweet_count: number
    like_count: number
    reply_count: number
    impression_count?: number
  }
}

interface XAPIUser {
  id: string
  name: string
  username: string
  profile_image_url?: string
  verified?: boolean
  public_metrics: {
    followers_count: number
  }
}

interface XAPIResponse {
  data?: XAPITweet[]
  includes?: {
    users: XAPIUser[]
  }
  meta: {
    result_count: number
    next_token?: string
  }
}

export function useTweets() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [apiStatus, setApiStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [newTweetsCount, setNewTweetsCount] = useState(0)
  const [showNewTweetsNotification, setShowNewTweetsNotification] = useState(false)

  // Initialize with comprehensive mock data
  useEffect(() => {
    const initializeTweets = async () => {
      setLoading(true)
      setApiStatus("connecting")

      // Simulate realistic loading time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const initialTweets = generateInitialTweets()
      setTweets(initialTweets)
      setApiStatus("connected")
      setLastFetch(new Date())
      setLoading(false)

      console.log("🚀 Loaded", initialTweets.length, "initial tweets")
      console.log("📊 Sentiment breakdown:", {
        positive: initialTweets.filter((t) => t.sentiment === "positive").length,
        neutral: initialTweets.filter((t) => t.sentiment === "neutral").length,
        negative: initialTweets.filter((t) => t.sentiment === "negative").length,
      })
    }

    initializeTweets()
  }, [])

  // Simulate real-time tweet stream
  useEffect(() => {
    if (apiStatus !== "connected") return

    const addNewTweet = () => {
      // Weighted sentiment distribution (more positive buzz around Monad)
      const sentiments: Array<"positive" | "neutral" | "negative"> = [
        "positive",
        "positive",
        "positive",
        "positive", // 40% positive
        "neutral",
        "neutral",
        "neutral", // 30% neutral
        "negative",
        "negative", // 20% negative
        "positive", // Extra positive for 50% total
      ]
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

      const newTweet = generateMockTweet(randomSentiment, 0) // 0 minutes ago = "now"
      newTweet.isNew = true

      setTweets((prevTweets) => {
        const updatedTweets = [newTweet, ...prevTweets]
        // Keep only the latest 100 tweets to prevent memory issues
        return updatedTweets.slice(0, 100)
      })

      setNewTweetsCount((prev) => prev + 1)
      setShowNewTweetsNotification(true)
      setLastFetch(new Date())

      console.log("✨ New tweet added:", {
        sentiment: newTweet.sentiment,
        user: newTweet.user.name,
        preview: newTweet.content.substring(0, 50) + "...",
      })

      // Auto-hide notification after 8 seconds
      setTimeout(() => {
        setShowNewTweetsNotification(false)
      }, 8000)
    }

    // Realistic tweet intervals (15 seconds to 2 minutes)
    const getRandomInterval = () => {
      const intervals = [
        15000, // 15 seconds (breaking news)
        30000, // 30 seconds (high activity)
        45000, // 45 seconds (normal activity)
        60000, // 1 minute (regular activity)
        90000, // 1.5 minutes (slower activity)
        120000, // 2 minutes (quiet period)
      ]
      return intervals[Math.floor(Math.random() * intervals.length)]
    }

    let timeoutId: NodeJS.Timeout

    const scheduleNextTweet = () => {
      const interval = getRandomInterval()
      console.log(`⏰ Next tweet in ${interval / 1000} seconds`)

      timeoutId = setTimeout(() => {
        addNewTweet()
        scheduleNextTweet() // Schedule the next one
      }, interval)
    }

    // Start the real-time simulation after initial load
    const initialDelay = setTimeout(() => {
      scheduleNextTweet()
    }, 5000) // Wait 5 seconds after initial load

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (initialDelay) clearTimeout(initialDelay)
    }
  }, [apiStatus])

  // Simulate occasional bursts of activity
  useEffect(() => {
    if (apiStatus !== "connected") return

    const createBurst = () => {
      const burstSize = 2 + Math.floor(Math.random() * 4) // 2-5 tweets
      console.log(`💥 Creating burst of ${burstSize} tweets`)

      for (let i = 0; i < burstSize; i++) {
        setTimeout(() => {
          const sentiments: Array<"positive" | "neutral" | "negative"> = ["positive", "positive", "neutral", "negative"]
          const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

          const burstTweet = generateMockTweet(randomSentiment, 0)
          burstTweet.isNew = true

          setTweets((prevTweets) => {
            const updatedTweets = [burstTweet, ...prevTweets]
            return updatedTweets.slice(0, 100)
          })

          setNewTweetsCount((prev) => prev + 1)
          setShowNewTweetsNotification(true)
          setLastFetch(new Date())
        }, i * 3000) // 3 second intervals during burst
      }
    }

    // Random bursts every 5-15 minutes
    const burstInterval = setInterval(
      () => {
        if (Math.random() > 0.7) {
          // 30% chance of burst
          createBurst()
        }
      },
      300000 + Math.random() * 600000,
    ) // 5-15 minutes

    return () => clearInterval(burstInterval)
  }, [apiStatus])

  // Mark tweets as read when user interacts
  const markTweetsAsRead = useCallback(() => {
    setNewTweetsCount(0)
    setShowNewTweetsNotification(false)
    setTweets((prevTweets) => prevTweets.map((tweet) => ({ ...tweet, isNew: false })))
    console.log("👀 Marked all tweets as read")
  }, [])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    console.log("🔄 Manual refresh triggered")

    // Simulate refetch delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Generate fresh tweets with some new ones
    const freshTweets = generateInitialTweets()

    // Add a few "breaking" tweets at the top
    const breakingTweets = []
    for (let i = 0; i < 3; i++) {
      const breakingTweet = generateMockTweet("positive", 0)
      breakingTweet.isNew = true
      breakingTweets.push(breakingTweet)
    }

    setTweets([...breakingTweets, ...freshTweets])
    setLastFetch(new Date())
    setLoading(false)
    setNewTweetsCount(breakingTweets.length)
    setShowNewTweetsNotification(true)

    console.log("✅ Refresh complete with", freshTweets.length + breakingTweets.length, "tweets")
  }, [])

  // Simulate network status changes
  useEffect(() => {
    const simulateNetworkIssues = () => {
      if (Math.random() > 0.95) {
        // 5% chance of temporary network issue
        console.log("⚠️ Simulating temporary network issue")
        setApiStatus("error")
        setError("Connection temporarily lost. Reconnecting...")

        setTimeout(
          () => {
            setApiStatus("connected")
            setError(null)
            console.log("✅ Connection restored")
          },
          3000 + Math.random() * 5000,
        ) // 3-8 seconds
      }
    }

    const networkCheckInterval = setInterval(simulateNetworkIssues, 120000) // Check every 2 minutes

    return () => clearInterval(networkCheckInterval)
  }, [])

  return {
    tweets,
    loading,
    error,
    lastFetch,
    apiStatus,
    newTweetsCount,
    showNewTweetsNotification,
    refetch,
    markTweetsAsRead,
  }
}
