import { resolveAssetUrl } from "@/lib/asset-url"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

export type GalleryItem = {
  image: string
  title: string
  date?: string
  category: string
  description: string
}

export type GalleryEntryGroup = {
  key: string
  title: string
  date?: string
  category: string
  description: string
  items: GalleryItem[]
  entry: CanisWorldEntry
}

export function formatCanisWorldDate(value?: string) {
  if (!value) return "日常"

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value))
}

export function getCanisWorldEntryKey(entry: CanisWorldEntry, index = 0) {
  return (
    entry._id ||
    `${entry.title || "daily"}-${entry.occurredAt || "undated"}-${index}`
  )
}

export function getCanisWorldEntryHref(entry: CanisWorldEntry, index = 0) {
  return `/daily/${encodeURIComponent(getCanisWorldEntryKey(entry, index))}`
}

export function createCanisWorldViewModel(data: CanisWorldData) {
  const entries = [...(data.entries || [])].sort(
    (a, b) => (Number(a.priority) || 0) - (Number(b.priority) || 0)
  )
  const featuredEntries = entries.filter((entry) => entry.featured).slice(0, 2)
  const featuredEntry: CanisWorldEntry = featuredEntries[0] ||
    entries[0] || {
      title: "今天還沒有留下足跡",
      excerpt: "Canis 今天還沒有留下文字。",
      category: "日常",
      images: ["/og.png"],
    }
  const galleryEntries = [...entries].sort((a, b) => {
    const dateDiff =
      new Date(b.occurredAt || 0).getTime() -
      new Date(a.occurredAt || 0).getTime()

    return dateDiff || (Number(a.priority) || 0) - (Number(b.priority) || 0)
  })
  const gallery: GalleryItem[] = galleryEntries.flatMap((entry) =>
    (entry.images || []).map((image) => ({
      image: resolveAssetUrl(image),
      title: entry.title,
      date: entry.occurredAt,
      category: entry.category || "日常",
      description:
        entry.excerpt || entry.content || "Canis 留下的一小段生活畫面。",
    }))
  )
  const galleryPreview = gallery.slice(0, 10)
  const recentEntries = galleryEntries.slice(0, 10)
  const galleryEntryGroups: GalleryEntryGroup[] = galleryEntries
    .map((entry, entryIndex) => {
      const items = (entry.images || []).map((image) => ({
        image: resolveAssetUrl(image),
        title: entry.title,
        date: entry.occurredAt,
        category: entry.category || "日常",
        description:
          entry.excerpt || entry.content || "Canis 留下的一小段生活畫面。",
      }))

      return {
        key: entry._id || `${entry.title}-${entry.occurredAt}-${entryIndex}`,
        title: entry.title,
        date: entry.occurredAt,
        category: entry.category || "日常",
        description:
          entry.excerpt || entry.content || "Canis 留下的一小段生活畫面。",
        items,
        entry,
      }
    })
  const statusProgress = Math.min(
    100,
    Math.max(-100, Number(data.status.completeness) || 0)
  )

  return {
    entries,
    featuredEntries,
    featuredEntry,
    gallery,
    galleryPreview,
    recentEntries,
    galleryEntryGroups,
    statusProgress,
  }
}
