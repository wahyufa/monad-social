interface FlaticonProps {
  icon: string
  style?: "regular" | "bold" | "solid"
  className?: string
}

export function Flaticon({ icon, style = "regular", className = "" }: FlaticonProps) {
  const getIconClass = () => {
    switch (style) {
      case "bold":
        return `fi fi-br-${icon}`
      case "solid":
        return `fi fi-sr-${icon}`
      default:
        return `fi fi-rr-${icon}`
    }
  }

  return <i className={`${getIconClass()} ${className}`} />
}

// Predefined icon components for common use cases
export const FlaticonSearch = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="search" className={className} />
)

export const FlaticonHeart = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="heart" className={className} />
)

export const FlaticonComment = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="comment" className={className} />
)

export const FlaticonShare = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="share" className={className} />
)

export const FlaticonRefresh = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="refresh" className={className} />
)

export const FlaticonFilter = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="filter" className={className} />
)

export const FlaticonTrendingUp = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="trending-up" className={className} />
)

export const FlaticonUsers = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="users" className={className} />
)

export const FlaticonDocument = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="document" className={className} />
)

export const FlaticonChart = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="chart-line" className={className} />
)

export const FlaticonWifi = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="wifi" className={className} />
)

export const FlaticonWifiSlash = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="wifi-slash" className={className} />
)

export const FlaticonClock = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="clock" className={className} />
)

export const FlaticonBell = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="bell" className={className} />
)

export const FlaticonArrowUp = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="arrow-up" className={className} />
)

export const FlaticonActivity = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="pulse" className={className} />
)

export const FlaticonExternalLink = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="link" className={className} />
)

export const FlaticonRetweet = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="repeat" className={className} />
)

export const FlaticonRotate = ({ className = "" }: { className?: string }) => (
  <Flaticon icon="rotate-right" className={className} />
)
