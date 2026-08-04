import { resolveAssetUrl } from "@/lib/asset-url"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

export type GalleryItem = {
  image: string
  title: string
  date?: string
  category: string
  description: string
}

export function formatCanisWorldDate(value?: string) {
  if (!value) return "日常"

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value))
}

export function createCanisWorldViewModel(data: CanisWorldData) {
  const entries = [...(data.entries || [])].sort(
    (a, b) => (Number(a.priority) || 0) - (Number(b.priority) || 0)
  )
  const featuredEntries = entries.filter((entry) => entry.featured)
  const featuredEntry: CanisWorldEntry = featuredEntries[0] ||
    entries[0] || {
      title: "今天還沒有留下足跡",
      excerpt: "Canis 今天還沒有留下文字。",
      category: "日常",
      images: ["/og.png"],
    }
  const gallery: GalleryItem[] = entries.flatMap((entry) =>
    (entry.images || []).map((image) => ({
      image: resolveAssetUrl(image),
      title: entry.title,
      date: entry.occurredAt,
      category: entry.category || "日常",
      description:
        entry.excerpt || entry.content || "Canis 留下的一小段生活畫面。",
    }))
  )
  const statusProgress = Math.min(
    100,
    Math.max(0, Number(data.status.completeness) || 0)
  )

  return {
    entries,
    featuredEntries,
    featuredEntry,
    gallery,
    statusProgress,
  }
}
