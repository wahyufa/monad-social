"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Heart,
  MessageCircle,
  Repeat2,
  ExternalLink,
  Filter,
  TrendingUp,
  Users,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  Bell,
  ArrowUp,
  Activity,
  FileText,
  BarChart3,
  Send,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTweets } from "@/hooks/use-tweets"
import { createTweetIntentUrl } from "@/lib/tweet-generator"
import Image from "next/image"

export default function MonadTwitterMonitor() {
  const {
    tweets,
    loading,
    error,
    lastFetch,
    apiStatus,
    newTweetsCount,
    showNewTweetsNotification,
    refetch,
    markTweetsAsRead,
  } = useTweets()

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterType, setFilterType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [showLiveIndicator, setShowLiveIndicator] = useState(true)

  const filteredTweets = tweets.filter((tweet) => {
    const matchesSearch =
      tweet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tweet.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tweet.user.handle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || tweet.type === filterType
    const matchesTab = activeTab === "all" || tweet.sentiment === activeTab

    return matchesSearch && matchesFilter && matchesTab
  })

  const sortedTweets = [...filteredTweets].sort((a, b) => {
    if (sortBy === "engagement") {
      return b.engagement.likes + b.engagement.retweets - (a.engagement.likes + a.engagement.retweets)
    }
    if (sortBy === "views") {
      return b.engagement.views - a.engagement.views
    }
    return 0
  })

  const highlightMention = (text: string) => {
    return text.replace(/@monad_xyz/g, '<span class="font-semibold" style="color: #7151d5;">@monad_xyz</span>')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const totalEngagement = tweets.reduce((acc, tweet) => acc + tweet.engagement.likes + tweet.engagement.retweets, 0)
  const totalViews = tweets.reduce((acc, tweet) => acc + tweet.engagement.views, 0)
  const avgEngagement = tweets.length > 0 ? Math.round(totalEngagement / tweets.length) : 0

  const sentimentCounts = {
    positive: tweets.filter((t) => t.sentiment === "positive").length,
    neutral: tweets.filter((t) => t.sentiment === "neutral").length,
    negative: tweets.filter((t) => t.sentiment === "negative").length,
  }

  const getStatusIcon = () => {
    switch (apiStatus) {
      case "connected":
        return <Wifi className="w-3 h-3 mr-1" />
      case "error":
        return <WifiOff className="w-3 h-3 mr-1" />
      default:
        return <Clock className="w-3 h-3 mr-1 animate-spin" />
    }
  }

  const getStatusText = () => {
    switch (apiStatus) {
      case "connected":
        return "Live Monitoring"
      case "error":
        return "Connection Failed"
      default:
        return "Connecting..."
    }
  }

  const getStatusColor = () => {
    switch (apiStatus) {
      case "connected":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "error":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    }
  }

  // Handle tweet button click
  const handleMakeTweet = () => {
    const tweetUrl = createTweetIntentUrl()
    window.open(tweetUrl, "_blank", "noopener,noreferrer")
  }

  // Auto-scroll to top when new tweets arrive
  useEffect(() => {
    if (newTweetsCount > 0 && showNewTweetsNotification) {
      const scrollArea = document.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollArea) {
        scrollArea.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }, [newTweetsCount, showNewTweetsNotification])

  // Hide live indicator after some time
  useEffect(() => {
    if (apiStatus === "connected") {
      const timer = setTimeout(() => setShowLiveIndicator(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [apiStatus])

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* New Tweets Notification */}
      {showNewTweetsNotification && newTweetsCount > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2">
          <Button
            onClick={markTweetsAsRead}
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2 animate-pulse rounded-full"
          >
            <ArrowUp className="w-4 h-4" />
            {newTweetsCount} new tweet{newTweetsCount > 1 ? "s" : ""} • Click to view
          </Button>
        </div>
      )}

      {/* Live Activity Indicator */}
      {showLiveIndicator && apiStatus === "connected" && (
        <div className="fixed top-4 right-4 z-40 animate-in slide-in-from-right-2">
          <div className="bg-gray-900 border border-gray-700 rounded-full px-3 py-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Live Feed Active</span>
          </div>
        </div>
      )}

      {/* Header with new gradient background */}
      <div
        className="border-b border-gray-800 sticky top-0 z-40 backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, rgba(53,0,129,.5) 0%, transparent 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Top row with links, last update, and attribution */}
          <div className="flex justify-between mb-4 items-center">
            <div className="flex items-center gap-3">{/* Removed docs and explorer links from here */}</div>

            <div className="flex items-center gap-4">
              {/* Last Update */}
              <div className="text-sm text-gray-400">Last update: {lastFetch?.toLocaleTimeString()}</div>

              {/* Made by xHistoria - moved here */}
              <a
                href="https://x.com/historizt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src="https://pbs.twimg.com/profile_images/1569612077165314054/rw5oNg_J_400x400.jpg"
                    alt="xHistoria"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-sm">Made by xHistoria</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                {/* Updated Monad Logo */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden">
                  <Image src="/monad-logo.png" alt="Monad Logo" fill className="object-cover" priority />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">Monad Social Monitor</h1>

                  <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-sm sm:text-base">Real-time tracking of @monad_xyz mentions</p>
                    {/* Monad Docs Link */}
                    <a
                      href="https://docs.monad.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                    </a>

                    {/* Monad Explorer Link */}
                    <a
                      href="https://testnet.monadexplorer.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Make a Tweet Button */}
              <Button
                variant="default"
                size="sm"
                onClick={handleMakeTweet}
                className="gap-2 bg-[#7151d5] hover:bg-[#583cb3] text-white rounded-full"
              >
                <Send className="w-4 h-4" />
                Make a Tweet
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={loading}
                className="gap-2 bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Fetching..." : "Refresh"}
              </Button>

              {/* Live Status with pulse animation */}
              <Badge variant="secondary" className={`${getStatusColor()} font-medium relative rounded-full`}>
                {apiStatus === "connected" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
                {getStatusIcon()}
                {getStatusText()}
              </Badge>

              <Badge variant="outline" className="bg-gray-900/50 border-gray-700 text-gray-300 rounded-full">
                {tweets.length} tweets
              </Badge>

              {/* New tweets indicator */}
              {newTweetsCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-purple-600/20 border-purple-500/30 animate-pulse rounded-full"
                  style={{ color: "#7151d5" }}
                >
                  <Bell className="w-3 h-3 mr-1" />
                  {newTweetsCount} new
                </Badge>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-500/30 bg-red-900/20 backdrop-blur-sm rounded-xl">
              <WifiOff className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>Connection Issue:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Search and Filters */}
          {tweets.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tweets, users, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-full"
                  style={{ borderColor: searchTerm ? "#7151d5" : "" }}
                />
              </div>
              <div className="flex gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 rounded-xl">
                    <SelectItem value="recent" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      Most Recent
                    </SelectItem>
                    <SelectItem
                      value="engagement"
                      className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg"
                    >
                      Top Engaged
                    </SelectItem>
                    <SelectItem value="views" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      Most Viewed
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 bg-gray-900/50 border-gray-700 text-white rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 rounded-xl">
                    <SelectItem value="all" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      All Types
                    </SelectItem>
                    <SelectItem value="mention" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      Mentions
                    </SelectItem>
                    <SelectItem value="reply" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      Replies
                    </SelectItem>
                    <SelectItem value="retweet" className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded-lg">
                      Retweets
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        {loading && tweets.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-6 text-gray-400" />
              <p className="text-gray-300 text-lg mb-2">Initializing real-time monitoring...</p>
              <p className="text-sm text-gray-500">Loading comprehensive @monad_xyz data</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Stats Column - Left Side */}
            <div className="lg:w-64 space-y-4">
              {/* Stats Cards - Now in vertical layout */}
              <Card className="bg-gray-900 border-gray-800 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" style={{ color: "#7151d5" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Engagement</p>
                      <p className="text-xl font-bold text-white">{formatNumber(totalEngagement)}</p>
                      <p className="text-xs text-green-400">↗ +12% from yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Users className="w-4 h-4" style={{ color: "#7151d5" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Views</p>
                      <p className="text-xl font-bold text-white">{formatNumber(totalViews)}</p>
                      <p className="text-xs text-green-400">↗ +8% from yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-4 h-4" style={{ color: "#7151d5" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Avg Engagement</p>
                      <p className="text-xl font-bold text-white">{formatNumber(avgEngagement)}</p>
                      <p className="text-xs text-red-400">↘ -3% from yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" style={{ color: "#7151d5" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Sentiment</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-lg font-bold text-white">
                          {Math.round((sentimentCounts.positive / tweets.length) * 100)}%
                        </span>
                        <span className="text-xs text-gray-400">Positive</span>
                      </div>
                      <p className="text-xs text-green-400">↗ +5% from yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Stats */}
              <Card className="bg-gray-900 border-gray-800 rounded-xl">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Sentiment Breakdown</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-400">Positive</span>
                        <span className="text-white">{sentimentCounts.positive}</span>
                      </div>
                      <Progress
                        value={(sentimentCounts.positive / tweets.length) * 100}
                        className="h-1.5 bg-gray-800 rounded-full"
                        indicatorClassName="bg-green-500 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Neutral</span>
                        <span className="text-white">{sentimentCounts.neutral}</span>
                      </div>
                      <Progress
                        value={(sentimentCounts.neutral / tweets.length) * 100}
                        className="h-1.5 bg-gray-800 rounded-full"
                        indicatorClassName="bg-gray-500 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-400">Negative</span>
                        <span className="text-white">{sentimentCounts.negative}</span>
                      </div>
                      <Progress
                        value={(sentimentCounts.negative / tweets.length) * 100}
                        className="h-1.5 bg-gray-800 rounded-full"
                        indicatorClassName="bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tweets Column - Right Side */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-900 border-gray-800 rounded-full">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:text-white text-gray-400 rounded-full"
                    style={{ backgroundColor: activeTab === "all" ? "#7151d5" : "" }}
                  >
                    All Tweets ({tweets.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="positive"
                    className="data-[state=active]:text-white text-gray-400 rounded-full"
                    style={{ backgroundColor: activeTab === "positive" ? "#7151d5" : "" }}
                  >
                    Positive ({sentimentCounts.positive})
                  </TabsTrigger>
                  <TabsTrigger
                    value="neutral"
                    className="data-[state=active]:text-white text-gray-400 rounded-full"
                    style={{ backgroundColor: activeTab === "neutral" ? "#7151d5" : "" }}
                  >
                    Neutral ({sentimentCounts.neutral})
                  </TabsTrigger>
                  <TabsTrigger
                    value="negative"
                    className="data-[state=active]:text-white text-gray-400 rounded-full"
                    style={{ backgroundColor: activeTab === "negative" ? "#7151d5" : "" }}
                  >
                    Negative ({sentimentCounts.negative})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-0">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {/* Changed from single column to grid layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pr-4">
                      {sortedTweets.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                          <p className="text-gray-300 text-lg">No tweets found matching your criteria.</p>
                        </div>
                      ) : (
                        sortedTweets.map((tweet) => (
                          <Card
                            key={tweet.id}
                            className={`bg-gray-900 border-gray-800 hover:bg-gray-800/70 hover:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-xl h-fit group ${
                              tweet.isNew
                                ? "border-l-4 bg-purple-950/20 animate-in slide-in-from-top-2"
                                : "border-l-4 border-l-gray-700"
                            }`}
                            style={{ borderLeftColor: tweet.isNew ? "#7151d5" : "" }}
                            onClick={() => window.open(tweet.url, "_blank", "noopener,noreferrer")}
                          >
                            <CardHeader className="pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12 ring-2 ring-gray-700 group-hover:ring-purple-500/50 transition-all duration-300">
                                    <AvatarImage src={tweet.user.avatar || "/placeholder.svg"} alt={tweet.user.name} />
                                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-[#583cb3] text-white text-sm">
                                      {tweet.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-lg text-white truncate group-hover:text-purple-200 transition-colors duration-300">
                                        {tweet.user.name}
                                      </span>
                                      {tweet.user.verified && (
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                          <span className="text-white text-xs font-bold">✓</span>
                                        </div>
                                      )}
                                      {tweet.isNew && (
                                        <Badge
                                          variant="secondary"
                                          className="border-purple-500/30 text-xs animate-pulse rounded-full flex-shrink-0"
                                          style={{ backgroundColor: "#7151d5", color: "white" }}
                                        >
                                          NEW
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                      <span className="truncate">{tweet.user.handle}</span>
                                      <span>•</span>
                                      <span className="truncate">{formatNumber(tweet.user.followers)} followers</span>
                                      <span>•</span>
                                      <span>{tweet.timestamp}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs rounded-full transition-all duration-300 ${
                                      tweet.sentiment === "positive"
                                        ? "bg-green-500/10 text-green-400 border-green-500/20 group-hover:bg-green-500/20"
                                        : tweet.sentiment === "negative"
                                          ? "bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20"
                                          : "bg-gray-500/10 text-gray-400 border-gray-500/20 group-hover:bg-gray-500/20"
                                    }`}
                                  >
                                    {tweet.sentiment}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.open(tweet.url, "_blank", "noopener,noreferrer")
                                    }}
                                    title="View original tweet"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p
                                className="text-sm leading-relaxed mb-4 text-gray-200 line-clamp-4 group-hover:text-gray-100 transition-colors duration-300"
                                dangerouslySetInnerHTML={{ __html: highlightMention(tweet.content) }}
                              />

                              <Separator className="my-4 bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300" />

                              {/* Engagement Metrics - Compact version for grid */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-400 hover:text-blue-400 p-0 h-auto rounded-full transition-all duration-300 group-hover:text-blue-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-semibold">
                                      {formatNumber(tweet.engagement.replies)}
                                    </span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-400 hover:text-green-400 p-0 h-auto rounded-full transition-all duration-300 group-hover:text-green-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Repeat2 className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-semibold">
                                      {formatNumber(tweet.engagement.retweets)}
                                    </span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-400 hover:text-red-400 p-0 h-auto rounded-full transition-all duration-300 group-hover:text-red-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Heart className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-semibold">
                                      {formatNumber(tweet.engagement.likes)}
                                    </span>
                                  </Button>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-sm">
                                  <BarChart3 className="w-4 h-4" />
                                  <span>{formatNumber(tweet.engagement.views)}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
