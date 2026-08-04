"use client"

import { useEffect } from "react"
import { ErrorState } from "@/components/error-state"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="zh-TW">
      <body>
        <ErrorState
          code="5XX"
          title="Canis World 暫時無法開啟"
          description="基地遇到未預期的狀況，請重新嘗試。"
          onRetry={reset}
        />
      </body>
    </html>
  )
}
