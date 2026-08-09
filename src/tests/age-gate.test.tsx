import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { renderToString } from "react-dom/server"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { AgeGate } from "@/components/age-gate"

const STORAGE_KEY = "canis-world-age-confirmed"

describe("AgeGate", () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0)
      return 1
    })
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("在 Hydration 前輸出可見的成人提醒備援畫面", () => {
    const html = renderToString(
      <AgeGate>
        <div>受保護內容</div>
      </AgeGate>
    )

    expect(html).toContain('role="alertdialog"')
    expect(html).toContain("進入前，先確認一件事")
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain("受保護內容")
  })

  it("尚未確認年齡時顯示 Alert Dialog 並鎖定內容", async () => {
    render(
      <AgeGate>
        <div data-testid="protected-content">受保護內容</div>
      </AgeGate>
    )

    expect(await screen.findByRole("alertdialog")).toBeVisible()
    expect(screen.getByText("進入前，先確認一件事")).toBeVisible()
    expect(screen.getByTestId("protected-content").parentElement).toHaveAttribute(
      "aria-hidden",
      "true"
    )
  })

  it("確認成年後記錄狀態、關閉提醒並解除內容鎖定", async () => {
    render(
      <AgeGate>
        <div data-testid="protected-content">受保護內容</div>
      </AgeGate>
    )

    fireEvent.click(await screen.findByRole("button", { name: "我已達法定年齡" }))

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    })
    expect(window.sessionStorage.getItem(STORAGE_KEY)).toBe("yes")
    expect(screen.getByTestId("protected-content").parentElement).toHaveAttribute(
      "aria-hidden",
      "false"
    )
  })

  it("目前分頁已確認年齡時直接解除內容鎖定", async () => {
    window.sessionStorage.setItem(STORAGE_KEY, "yes")

    render(
      <AgeGate>
        <div data-testid="protected-content">受保護內容</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
      expect(screen.getByTestId("protected-content").parentElement).toHaveAttribute(
        "aria-hidden",
        "false"
      )
    })
  })

  it("瀏覽器儲存空間不可用時仍可完成目前頁面的驗證", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError")
    })
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError")
    })

    render(
      <AgeGate>
        <div data-testid="protected-content">受保護內容</div>
      </AgeGate>
    )

    fireEvent.click(await screen.findByRole("button", { name: "我已達法定年齡" }))

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
      expect(screen.getByTestId("protected-content").parentElement).toHaveAttribute(
        "aria-hidden",
        "false"
      )
    })
  })
})
