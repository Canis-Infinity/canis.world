import type { Metadata } from "next"
import { AgeGate } from "@/components/age-gate"
import { GalleryArchiveSection } from "@/components/canis-world/gallery-archive-section"
import { SiteFooter } from "@/components/canis-world/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getCanisWorld } from "@/lib/canis-world"
import { createCanisWorldViewModel } from "@/lib/canis-world-view-model"

export const metadata: Metadata = {
  title: "所有貼文 | Canis World",
  description: "依日期與分類整理 Canis World 的日常貼文。",
}

type GalleryPageProps = {
  searchParams: Promise<{
    from?: string | string[]
    to?: string | string[]
    category?: string | string[]
    q?: string | string[]
    sort?: string | string[]
  }>
}

const DAY_IN_MS = 24 * 60 * 60 * 1000
const MAX_RANGE_IN_DAYS = 366

function getGroupDate(date?: string) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function parseDateParam(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function formatDateParam(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatRangeLabel(from: Date, to: Date) {
  const formatter = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  })
  return `${formatter.format(from)} 至 ${formatter.format(to)}`
}

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const data = await getCanisWorld()
  const viewModel = createCanisWorldViewModel(data)
  const params = await searchParams
  const requestedFrom = firstParam(params.from)
  const requestedTo = firstParam(params.to)
  const requestedCategory = firstParam(params.category) || "all"
  const requestedKeyword = (firstParam(params.q) || "").trim().slice(0, 100)
  const requestedSort = firstParam(params.sort) === "oldest" ? "oldest" : "newest"
  const categoryOptions = Array.from(
    new Set(viewModel.galleryEntryGroups.map((group) => group.category))
  ).sort((a, b) => a.localeCompare(b, "zh-Hant"))
  const selectedCategory = categoryOptions.includes(requestedCategory)
    ? requestedCategory
    : "all"
  const entryDates = viewModel.galleryEntryGroups
    .map((group) => getGroupDate(group.date))
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => a.getTime() - b.getTime())
  const availableTo = entryDates.at(-1)
  const defaultFrom = availableTo
    ? new Date(Date.UTC(availableTo.getUTCFullYear(), availableTo.getUTCMonth(), 1))
    : new Date()
  const defaultTo = availableTo
    ? new Date(
        Date.UTC(availableTo.getUTCFullYear(), availableTo.getUTCMonth() + 1, 0)
      )
    : defaultFrom
  const parsedFrom = parseDateParam(requestedFrom)
  const parsedTo = parseDateParam(requestedTo)
  const requestedRangeIsValid =
    parsedFrom &&
    parsedTo &&
    parsedFrom <= parsedTo &&
    (parsedTo.getTime() - parsedFrom.getTime()) / DAY_IN_MS <= MAX_RANGE_IN_DAYS
  const selectedFromDate = requestedRangeIsValid ? parsedFrom : defaultFrom
  const selectedToDate = requestedRangeIsValid ? parsedTo : defaultTo
  const selectedToExclusive = new Date(selectedToDate.getTime() + DAY_IN_MS)
  const normalizedKeyword = requestedKeyword.toLocaleLowerCase("zh-Hant")
  const filteredGroups = viewModel.galleryEntryGroups
    .filter((group) => {
      const date = getGroupDate(group.date)
      if (!date || date < selectedFromDate || date >= selectedToExclusive) return false
      if (selectedCategory !== "all" && group.category !== selectedCategory) return false
      if (!normalizedKeyword) return true

      return [group.title, group.description, group.category].some((value) =>
        value.toLocaleLowerCase("zh-Hant").includes(normalizedKeyword)
      )
    })
    .sort((a, b) => {
      const first = getGroupDate(a.date)?.getTime() || 0
      const second = getGroupDate(b.date)?.getTime() || 0
      return requestedSort === "oldest" ? first - second : second - first
    })
  return (
    <AgeGate>
      <main className="min-h-svh bg-background text-foreground">
        <SiteHeader
          linkLabel={data.content.headerLinkLabel}
          linkUrl={data.content.headerLinkUrl}
        />
        <GalleryArchiveSection
          key={`${formatDateParam(selectedFromDate)}:${formatDateParam(selectedToDate)}:${selectedCategory}:${requestedKeyword}:${requestedSort}`}
          groups={filteredGroups}
          totalCount={filteredGroups.length}
          selectedFrom={formatDateParam(selectedFromDate)}
          selectedTo={formatDateParam(selectedToDate)}
          selectedCategory={selectedCategory}
          selectedKeyword={requestedKeyword}
          selectedSort={requestedSort}
          categories={categoryOptions}
          rangeLabel={formatRangeLabel(selectedFromDate, selectedToDate)}
        />
        <SiteFooter footer={data.footer} />
      </main>
    </AgeGate>
  )
}
