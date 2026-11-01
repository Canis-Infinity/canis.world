import { describe, expect, it } from "vitest"
import { fallbackCanisWorld } from "@/lib/canis-world-fallback"
import {
  createCanisWorldViewModel,
  formatCanisWorldDate,
} from "@/lib/canis-world-view-model"

describe("精選日常", () => {
  it("日期使用補零的年月日格式，缺漏或無效日期保留預設文字", () => {
    expect(formatCanisWorldDate("2026-07-06T12:00:00")).toBe("2026-07-06")
    expect(formatCanisWorldDate()).toBe("日常")
    expect(formatCanisWorldDate("invalid")).toBe("日常")
  })
  it("依排序顯示最多五篇，並保留其他日常", () => {
    const entries = Array.from({ length: 7 }, (_, index) => ({
      _id: String(index),
      title: `日常 ${index}`,
      priority: 7 - index,
      featured: index !== 3,
    }))
    const result = createCanisWorldViewModel({ ...fallbackCanisWorld, entries })
    expect(result.featuredEntries.map((entry) => entry._id)).toEqual([
      "6",
      "5",
      "4",
      "2",
      "1",
    ])
    expect(result.entries).toHaveLength(7)
    expect(result.featuredEntry._id).toBe("6")
  })
})
