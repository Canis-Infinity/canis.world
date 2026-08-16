import type { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"

export const metadata: Metadata = {
  metadataBase: new URL("https://canis.world"),
  title: "Canis World",
  description:
    "Canis 的人型犬日常基地，收著生活片段、出遊照片、碎念與基地紀錄。",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Canis World",
    description: "Canis 的人型犬日常基地。",
    url: "https://canis.world",
    siteName: "Canis World",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "zh_TW",
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-TW"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          {children}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}
