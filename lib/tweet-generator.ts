// Array of positive tweet templates about Monad
const positiveTweetTemplates = [
  "Just discovered @monad_xyz and I'm impressed by their parallel execution architecture! 10,000+ TPS with full EVM compatibility is a game changer for blockchain scalability. 🚀 #MonadLabs #Blockchain",

  "Excited about the future of blockchain with @monad_xyz! Their approach to parallel execution while maintaining EVM compatibility is exactly what the industry needs. 💯 #MonadLabs",

  "The team at @monad_xyz is solving one of the biggest challenges in blockchain - scalability without sacrificing decentralization. Bullish on their technology! 📈 #MonadLabs",

  "Been following @monad_xyz development and their progress is impressive. Can't wait to see their parallel execution model in production! 💪 #MonadLabs #Blockchain",

  "@monad_xyz testnet performance is mind-blowing. 10k TPS with full EVM compatibility is the breakthrough we've been waiting for! ⚡ #MonadLabs",

  "The innovation happening at @monad_xyz is next level. Their parallel execution architecture is brilliantly designed! 🧠 #MonadLabs #Blockchain",

  "Just read the @monad_xyz whitepaper and I'm blown away by their approach to blockchain scalability. This could revolutionize the entire ecosystem! 🔥 #MonadLabs",

  "Impressed by @monad_xyz's commitment to maintaining EVM compatibility while achieving massive scale. The future of high-performance blockchains is here! 🚀 #MonadLabs",
]

/**
 * Generates a random positive tweet about Monad
 * @returns A URL-encoded tweet text
 */
export function generatePositiveMonadTweet(): string {
  const randomIndex = Math.floor(Math.random() * positiveTweetTemplates.length)
  const tweetText = positiveTweetTemplates[randomIndex]
  return encodeURIComponent(tweetText)
}

/**
 * Creates a Twitter intent URL with a pre-populated positive tweet about Monad
 * @returns The Twitter intent URL
 */
export function createTweetIntentUrl(): string {
  const tweetText = generatePositiveMonadTweet()
  return `https://x.com/intent/tweet?text=${tweetText}`
}
