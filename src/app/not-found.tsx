import type { Metadata } from "next"
import { ErrorState } from "@/components/error-state"

export const metadata: Metadata = {
  title: "找不到頁面 | Canis World",
}

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="這裡沒有留下足跡"
      description="這個頁面可能已經搬走，或從來沒有存在過。"
    />
  )
}
