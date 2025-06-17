// Comprehensive mock data for realistic Twitter simulation

export interface Tweet {
  id: string
  user: {
    name: string
    handle: string
    avatar: string
    verified: boolean
    followers: number
  }
  content: string
  timestamp: string
  url: string
  engagement: {
    likes: number
    retweets: number
    replies: number
    views: number
  }
  type: "mention" | "reply" | "retweet"
  sentiment: "positive" | "neutral" | "negative"
  isNew?: boolean
}

const cryptoInfluencers = [
  {
    name: "Vitalik Buterin",
    handle: "VitalikButerin",
    verified: true,
    followers: 5200000,
    avatar: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg",
  },
  {
    name: "Keone Hon",
    handle: "keone_hon",
    verified: true,
    followers: 45200,
    avatar: "https://pbs.twimg.com/profile_images/1590438884339777536/LJRZDAFn_400x400.jpg",
  },
  {
    name: "Pseudotheos",
    handle: "pseudotheos",
    verified: true,
    followers: 89400,
    avatar: "https://pbs.twimg.com/profile_images/1590476622347935744/sMSYr_Xq_400x400.jpg",
  },
  {
    name: "Cobie",
    handle: "cobie",
    verified: true,
    followers: 892000,
    avatar: "https://pbs.twimg.com/profile_images/1479226215605473285/V0vyYbWm_400x400.jpg",
  },
  {
    name: "Ansem",
    handle: "blknoiz06",
    verified: true,
    followers: 567000,
    avatar: "https://pbs.twimg.com/profile_images/1613654818312900608/ULgPoQlY_400x400.jpg",
  },
  {
    name: "Delphi Digital",
    handle: "Delphi_Digital",
    verified: true,
    followers: 234000,
    avatar: "https://pbs.twimg.com/profile_images/1658921838091689984/BcQvfDZO_400x400.jpg",
  },
  {
    name: "Messari",
    handle: "MessariCrypto",
    verified: true,
    followers: 445000,
    avatar: "https://pbs.twimg.com/profile_images/1059441429212532736/OgeMT-pD_400x400.jpg",
  },
  {
    name: "Bankless",
    handle: "BanklessHQ",
    verified: true,
    followers: 678000,
    avatar: "https://pbs.twimg.com/profile_images/1639698578141736960/bVHJEPGE_400x400.jpg",
  },
  {
    name: "DefiLlama",
    handle: "DefiLlama",
    verified: true,
    followers: 123000,
    avatar: "https://pbs.twimg.com/profile_images/1377170621616099329/qmRyPIpP_400x400.jpg",
  },
  {
    name: "Polynya",
    handle: "epolynya",
    verified: true,
    followers: 98000,
    avatar: "https://pbs.twimg.com/profile_images/1517390094176493568/wZ_uLAg4_400x400.jpg",
  },
]

const regularUsers = [
  {
    name: "Alex Chen",
    handle: "alexc_crypto",
    verified: false,
    followers: 12400,
    avatar: "https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg",
  },
  {
    name: "Sarah Williams",
    handle: "sarahw_defi",
    verified: false,
    followers: 8900,
    avatar: "https://pbs.twimg.com/profile_images/1493396441521491970/R5_wzm1t_400x400.jpg",
  },
  {
    name: "Mike Rodriguez",
    handle: "mike_blockchain",
    verified: false,
    followers: 15600,
    avatar: "https://pbs.twimg.com/profile_images/1499124402254716929/g5KwGwLA_400x400.jpg",
  },
  {
    name: "Emma Thompson",
    handle: "emma_web3",
    verified: false,
    followers: 6700,
    avatar: "https://pbs.twimg.com/profile_images/1489673402350227457/Q9aHYtB0_400x400.jpg",
  },
  {
    name: "David Kim",
    handle: "davidk_eth",
    verified: false,
    followers: 23400,
    avatar: "https://pbs.twimg.com/profile_images/1511899736033689600/QJukgj3t_400x400.jpg",
  },
  {
    name: "Lisa Zhang",
    handle: "lisa_crypto",
    verified: false,
    followers: 9800,
    avatar: "https://pbs.twimg.com/profile_images/1502345152368369665/QVOQgLfg_400x400.jpg",
  },
  {
    name: "James Wilson",
    handle: "jameswilson_",
    verified: false,
    followers: 4500,
    avatar: "https://pbs.twimg.com/profile_images/1507745190021234689/ZTFX35QZ_400x400.jpg",
  },
  {
    name: "Maria Garcia",
    handle: "maria_defi",
    verified: false,
    followers: 11200,
    avatar: "https://pbs.twimg.com/profile_images/1498765390935719936/5X9xDTZ0_400x400.jpg",
  },
  {
    name: "Tom Anderson",
    handle: "tom_blockchain",
    verified: false,
    followers: 7800,
    avatar: "https://pbs.twimg.com/profile_images/1505248657137442817/vz5j2Fla_400x400.jpg",
  },
  {
    name: "Rachel Brown",
    handle: "rachel_web3",
    verified: false,
    followers: 13900,
    avatar: "https://pbs.twimg.com/profile_images/1491823980944769025/QDc_BkF7_400x400.jpg",
  },
  {
    name: "Kevin Lee",
    handle: "kevin_crypto",
    verified: false,
    followers: 5600,
    avatar: "https://pbs.twimg.com/profile_images/1509876111741739008/2hHyHvbd_400x400.jpg",
  },
  {
    name: "Sophie Martin",
    handle: "sophie_eth",
    verified: false,
    followers: 8200,
    avatar: "https://pbs.twimg.com/profile_images/1497654352488407040/DPpQ6bM4_400x400.jpg",
  },
  {
    name: "Chris Taylor",
    handle: "chris_defi",
    verified: false,
    followers: 16700,
    avatar: "https://pbs.twimg.com/profile_images/1503487031891984384/JvRnf9Zy_400x400.jpg",
  },
  {
    name: "Anna Johnson",
    handle: "anna_blockchain",
    verified: false,
    followers: 3400,
    avatar: "https://pbs.twimg.com/profile_images/1495738019216023553/N5-nR3fW_400x400.jpg",
  },
  {
    name: "Ryan Davis",
    handle: "ryan_web3",
    verified: false,
    followers: 9100,
    avatar: "https://pbs.twimg.com/profile_images/1501234652615680000/MGcYZ2Xj_400x400.jpg",
  },
]

const positiveTweets = [
  "Excited to see @monad_xyz pushing the boundaries of parallel execution! The 10,000+ TPS benchmarks are incredible 🚀 #MonadLabs",
  "Just read the @monad_xyz whitepaper and I'm blown away by their approach to EVM compatibility with parallel processing. This could be a game changer! 💯",
  "@monad_xyz is solving one of the biggest challenges in blockchain - scalability without sacrificing decentralization. Bullish! 📈",
  "The team behind @monad_xyz has some serious talent. Their parallel execution model is exactly what the industry needs right now 🔥",
  "Finally, a blockchain that can handle real-world adoption! @monad_xyz's architecture is revolutionary 🌟",
  "Been following @monad_xyz development and their progress is impressive. Can't wait to see this in production! 💪",
  "@monad_xyz testnet performance is mind-blowing. 10k TPS with full EVM compatibility? Sign me up! 🚀",
  "The innovation happening at @monad_xyz is next level. Parallel execution done right! 👏",
  "@monad_xyz is going to change everything. Their approach to consensus and execution is brilliant 🧠",
  "Huge fan of what @monad_xyz is building. The future of high-performance blockchains is here! ⚡",
  "Just deployed my first contract on @monad_xyz testnet. The speed is unreal! 🏃‍♂️💨",
  "@monad_xyz team continues to deliver. Their technical deep dives are always insightful 📚",
  "The parallel execution model of @monad_xyz is a masterpiece of engineering 🎯",
  "Impressed by @monad_xyz's commitment to maintaining EVM compatibility while achieving massive scale 🔧",
  "@monad_xyz is setting new standards for blockchain performance. Excited for mainnet! 🎉",
]

const neutralTweets = [
  "Interesting technical approach by @monad_xyz on parallel execution. Will be curious to see how it performs at scale.",
  "Reading about @monad_xyz's consensus mechanism. The parallel processing design is complex but potentially powerful.",
  "@monad_xyz announced their latest testnet results. 10k TPS is impressive if it can maintain decentralization.",
  "The @monad_xyz team published a new technical blog post about their execution model. Worth a read for blockchain devs.",
  "Comparing different L1 solutions and @monad_xyz's parallel execution approach stands out as unique.",
  "@monad_xyz testnet is live. Testing some basic transactions to see how the parallel execution works in practice.",
  "Attended a presentation about @monad_xyz architecture. The technical details are quite sophisticated.",
  "@monad_xyz's approach to state management in parallel execution is an interesting engineering challenge.",
  "Looking at the @monad_xyz codebase. The implementation of parallel consensus is well thought out.",
  "The @monad_xyz whitepaper discusses some novel approaches to blockchain scalability. Technical but informative.",
  "@monad_xyz team shared updates on their progress. Development seems to be moving steadily forward.",
  "Analyzing the trade-offs in @monad_xyz's design choices. Interesting balance between performance and decentralization.",
  "@monad_xyz's parallel execution model raises some questions about MEV and transaction ordering.",
  "The @monad_xyz testnet metrics show promising results. Will be interesting to see mainnet performance.",
  "Discussing @monad_xyz's technical architecture with other developers. Lots of interesting design decisions.",
]

const negativeTweets = [
  "Still skeptical about @monad_xyz's claims. Parallel execution sounds good in theory but implementation challenges are real.",
  "Concerned about the complexity of @monad_xyz's parallel consensus. More complexity usually means more attack vectors.",
  "@monad_xyz's 10k TPS claims need more independent verification. Testnet conditions are very different from mainnet.",
  "The @monad_xyz approach seems to sacrifice some decentralization for performance. Not sure if that's the right trade-off.",
  "Worried about the centralization risks in @monad_xyz's validator set. High performance often comes at a cost.",
  "@monad_xyz's parallel execution model might face issues with complex smart contract interactions.",
  "The @monad_xyz team hasn't addressed some key concerns about MEV and front-running in their parallel model.",
  "Skeptical about @monad_xyz's ability to maintain EVM compatibility with such aggressive parallelization.",
  "@monad_xyz's consensus mechanism seems overly complex. Simpler solutions often prove more robust long-term.",
  "The @monad_xyz testnet results look good but I'm waiting to see how it handles real-world stress testing.",
  "Concerned about the hardware requirements for @monad_xyz validators. Could lead to centralization.",
  "@monad_xyz's parallel execution might create new types of bugs and vulnerabilities we haven't seen before.",
  "The @monad_xyz economic model for validators seems unclear. Tokenomics need more transparency.",
  "While @monad_xyz's tech is impressive, I'm worried about the practical challenges of parallel state management.",
  "The @monad_xyz approach to handling transaction dependencies in parallel execution seems problematic.",
]

function getRandomUser() {
  const allUsers = [...cryptoInfluencers, ...regularUsers]
  return allUsers[Math.floor(Math.random() * allUsers.length)]
}

function getRandomEngagement(userFollowers: number, sentiment: string) {
  const baseMultiplier = userFollowers > 100000 ? 0.02 : userFollowers > 50000 ? 0.015 : 0.01
  const sentimentMultiplier = sentiment === "positive" ? 1.5 : sentiment === "negative" ? 1.2 : 1.0

  const likes = Math.floor(Math.random() * userFollowers * baseMultiplier * sentimentMultiplier)
  const retweets = Math.floor(likes * (0.1 + Math.random() * 0.3))
  const replies = Math.floor(likes * (0.05 + Math.random() * 0.15))
  const views = Math.floor(likes * (8 + Math.random() * 12))

  return { likes, retweets, replies, views }
}

function getTimeAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return "now"
  if (minutesAgo < 60) return `${Math.floor(minutesAgo)}m`
  if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h`
  return `${Math.floor(minutesAgo / 1440)}d`
}

export function generateMockTweet(sentiment?: "positive" | "neutral" | "negative", minutesAgo?: number): Tweet {
  const user = getRandomUser()
  const tweetSentiment =
    sentiment ||
    (["positive", "neutral", "negative"][Math.floor(Math.random() * 3)] as "positive" | "neutral" | "negative")

  let content: string
  if (tweetSentiment === "positive") {
    content = positiveTweets[Math.floor(Math.random() * positiveTweets.length)]
  } else if (tweetSentiment === "negative") {
    content = negativeTweets[Math.floor(Math.random() * negativeTweets.length)]
  } else {
    content = neutralTweets[Math.floor(Math.random() * neutralTweets.length)]
  }

  const timeAgo = minutesAgo !== undefined ? minutesAgo : Math.random() * 2880 // Random time up to 2 days ago
  const engagement = getRandomEngagement(user.followers, tweetSentiment)
  const tweetId = Math.random().toString(36).substr(2, 9)

  return {
    id: tweetId,
    user: {
      name: user.name,
      handle: `@${user.handle}`,
      avatar: user.avatar || `/placeholder.svg?height=40&width=40`,
      verified: user.verified,
      followers: user.followers,
    },
    content,
    timestamp: getTimeAgo(timeAgo),
    url: `https://twitter.com/${user.handle}/status/${tweetId}`,
    engagement,
    type: Math.random() > 0.7 ? "reply" : "mention",
    sentiment: tweetSentiment,
  }
}

export function generateInitialTweets(): Tweet[] {
  const tweets: Tweet[] = []

  // Generate 15 positive tweets
  for (let i = 0; i < 15; i++) {
    tweets.push(generateMockTweet("positive", Math.random() * 1440))
  }

  // Generate 12 neutral tweets
  for (let i = 0; i < 12; i++) {
    tweets.push(generateMockTweet("neutral", Math.random() * 1440))
  }

  // Generate 8 negative tweets
  for (let i = 0; i < 8; i++) {
    tweets.push(generateMockTweet("negative", Math.random() * 1440))
  }

  // Sort by timestamp (newest first)
  return tweets.sort((a, b) => {
    const aMinutes = parseTimeToMinutes(a.timestamp)
    const bMinutes = parseTimeToMinutes(b.timestamp)
    return aMinutes - bMinutes
  })
}

function parseTimeToMinutes(timestamp: string): number {
  if (timestamp === "now") return 0
  const value = Number.parseInt(timestamp)
  if (timestamp.includes("m")) return value
  if (timestamp.includes("h")) return value * 60
  if (timestamp.includes("d")) return value * 1440
  return 0
}
