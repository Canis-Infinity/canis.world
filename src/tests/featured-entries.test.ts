import { describe, expect, it } from "vitest"
import { fallbackCanisWorld } from "@/lib/canis-world-fallback"
import {
  createCanisWorldViewModel,
  formatCanisWorldDate,
  selectRandomHeroEntry,
} from "@/lib/canis-world-view-model"

describe("精選日常", () => {
  it("主視覺可抽到每篇精選且圖片與文章一致，不受舊指定文章設定影響", () => {
    const entries = Array.from({ length: 5 }, (_, i) => ({
      _id: String(i),
      title: `精選 ${i}`,
      featured: true,
      images: [`/${i}.jpg`],
    }))
    const viewModel = createCanisWorldViewModel({
      ...fallbackCanisWorld,
      content: { ...fallbackCanisWorld.content, heroEntryId: "0" },
      entries: [
        ...entries,
        { _id: "normal", title: "一般日常", featured: false },
      ],
    })
    for (let i = 0; i < 5; i++) {
      expect(selectRandomHeroEntry(viewModel, i)).toEqual(entries[i])
    }
    expect(selectRandomHeroEntry(viewModel, 0)).toEqual(entries[0])
    expect(selectRandomHeroEntry(viewModel, 4)).toEqual(entries[4])
  })
  it("零篇或單篇精選時仍能顯示主視覺", () => {
    for (const featured of [false, true]) {
      const entry = { title: "唯一日常", featured }
      const viewModel = createCanisWorldViewModel({
        ...fallbackCanisWorld,
        entries: [entry],
      })
      expect(selectRandomHeroEntry(viewModel, 0)).toEqual(entry)
    }
    const empty = createCanisWorldViewModel({
      ...fallbackCanisWorld,
      entries: [],
    })
    expect(selectRandomHeroEntry(empty, 0).title).toBe("今天還沒有留下足跡")
  })
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
