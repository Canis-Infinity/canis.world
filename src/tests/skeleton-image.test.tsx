import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { SkeletonImage } from "@/components/canis-world/skeleton-image"

describe("SkeletonImage", () => {
  it("下載完成前顯示骨架，完成後顯示圖片", async () => {
    const { container } = render(
      <SkeletonImage src="/photo.jpg" alt="日常照片" fill unoptimized />
    )
    const image = screen.getByAltText("日常照片")
    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
    expect(image).toHaveClass("opacity-0")

    fireEvent.load(image)

    await waitFor(() => {
      expect(
        container.querySelector('[data-slot="skeleton"]')
      ).not.toBeInTheDocument()
      expect(image).not.toHaveClass("opacity-0")
    })
  })

  it("圖片失敗時停止骨架並顯示替代提示，切換來源後重新載入", () => {
    const { container, rerender } = render(
      <SkeletonImage src="/missing.jpg" alt="日常照片" fill unoptimized />
    )
    fireEvent.error(screen.getByAltText("日常照片"))

    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "日常照片（圖片暫時無法載入）" })
    ).toBeVisible()

    rerender(
      <SkeletonImage src="/replacement.jpg" alt="新照片" fill unoptimized />
    )

    expect(screen.queryByText("圖片暫時無法載入")).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
  })
})
