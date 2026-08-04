"use client"

import { useEffect } from "react"
import { ErrorState } from "@/components/error-state"

export default function ErrorPage({
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
    <ErrorState
      code="5XX"
      title="基地暫時沒有回應"
      description="剛才的內容沒有成功載入，可以稍後再試一次。"
      onRetry={reset}
    />
  )
}
