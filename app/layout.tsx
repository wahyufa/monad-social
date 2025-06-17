import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Monad Social Monitor",
  description: "Real-time tracking of @monad_xyz mentions on Twitter",
  generator: "v0.dev",
  icons: {
    icon: "https://docs.monad.xyz/img/monad_logo.png",
    shortcut: "https://docs.monad.xyz/img/monad_logo.png",
    apple: "https://docs.monad.xyz/img/monad_logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add Satoshi and Inter fonts */}
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="https://docs.monad.xyz/img/monad_logo.png" />
        <link rel="shortcut icon" href="https://docs.monad.xyz/img/monad_logo.png" />
        <link rel="apple-touch-icon" href="https://docs.monad.xyz/img/monad_logo.png" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
