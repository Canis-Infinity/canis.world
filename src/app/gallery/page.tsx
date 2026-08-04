import type { Metadata } from "next"
import { AgeGate } from "@/components/age-gate"
import { GalleryArchiveSection } from "@/components/canis-world/gallery-archive-section"
import { SiteFooter } from "@/components/canis-world/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getCanisWorld } from "@/lib/canis-world"
import { createCanisWorldViewModel } from "@/lib/canis-world-view-model"

export const metadata: Metadata = {
  title: "完整相簿 | Canis World",
  description: "依分類整理 Canis World 的日常照片與出遊畫面。",
}

type GalleryPageProps = {
  searchParams: Promise<{
    from?: string | string[]
    to?: string | string[]
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
  return `${formatter.format(from)} 至 ${formatter.format(to)}，`
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const data = await getCanisWorld()
  const viewModel = createCanisWorldViewModel(data)
  const params = await searchParams
  const requestedFrom = Array.isArray(params.from) ? params.from[0] : params.from
  const requestedTo = Array.isArray(params.to) ? params.to[0] : params.to
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
  const filteredGroups = viewModel.galleryEntryGroups.filter((group) => {
    const date = getGroupDate(group.date)
    return date && date >= selectedFromDate && date < selectedToExclusive
  })
  const filteredPhotoCount = filteredGroups.reduce(
    (count, group) => count + group.items.length,
    0
  )

  return (
    <AgeGate>
      <main className="min-h-svh bg-background text-foreground">
        <SiteHeader
          linkLabel={data.content.headerLinkLabel}
          linkUrl={data.content.headerLinkUrl}
        />
        <GalleryArchiveSection
          groups={filteredGroups}
          totalCount={filteredPhotoCount}
          selectedFrom={formatDateParam(selectedFromDate)}
          selectedTo={formatDateParam(selectedToDate)}
          rangeLabel={formatRangeLabel(selectedFromDate, selectedToDate)}
        />
        <SiteFooter footer={data.footer} />
      </main>
    </AgeGate>
  )
}
