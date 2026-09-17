"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { EntrySkeleton } from "@/components/canis-world/entry-skeleton"
import { BookOpen, CalendarRange, Newspaper } from "lucide-react"
import { DailyEntryCard } from "@/components/canis-world/daily-entry-card"
import { GalleryPeriodFilter } from "@/components/canis-world/gallery-period-filter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import type { GalleryEntryGroup } from "@/lib/canis-world-view-model"

const POST_BATCH_SIZE = 8

type GalleryArchiveSectionProps = {
  groups: GalleryEntryGroup[]
  totalCount: number
  selectedFrom: string
  selectedTo: string
  selectedCategory: string
  selectedKeyword: string
  selectedSort: "newest" | "oldest"
  categories: string[]
  rangeLabel: string
}

export function GalleryArchiveSection({
  groups,
  totalCount,
  selectedFrom,
  selectedTo,
  selectedCategory,
  selectedKeyword,
  selectedSort,
  categories,
  rangeLabel,
}: GalleryArchiveSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [visiblePostCount, setVisiblePostCount] = useState(POST_BATCH_SIZE)
  const visibleGroups = useMemo(
    () => groups.slice(0, visiblePostCount),
    [groups, visiblePostCount]
  )
  const hasMore = visiblePostCount < groups.length

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-3 gap-1">
            <Newspaper className="size-3.5" />
            所有貼文
          </Badge>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Canis 的日常貼文
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            依日期整理生活、出遊與當下留下的紀錄。
          </p>
        </div>
        <GalleryPeriodFilter
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          selectedCategory={selectedCategory}
          selectedKeyword={selectedKeyword}
          selectedSort={selectedSort}
          categories={categories}
          onNavigate={(href) => startTransition(() => router.push(href))}
        />
        <div
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          aria-label="篩選結果摘要"
        >
          <span className="inline-flex items-center gap-1.5">
            <CalendarRange className="size-4" />
            {rangeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4" />
            {totalCount} 篇貼文
          </span>
        </div>
      </div>

      {isPending ? (
        <div aria-busy="true">
          <p role="status" className="sr-only">
            正在載入篩選結果。
          </p>
          <div
            aria-hidden="true"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <EntrySkeleton key={index} />
            ))}
          </div>
        </div>
      ) : visibleGroups.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group, index) => (
            <DailyEntryCard
              key={group.key}
              entry={group.entry}
              priority={index < 2}
            />
          ))}
          {hasMore ? (
            <div className="col-span-full flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setVisiblePostCount((count) => count + POST_BATCH_SIZE)
                }
              >
                查看更多
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>沒有符合條件的貼文</EmptyTitle>
            <EmptyDescription>
              可以調整日期、分類或搜尋關鍵字。
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  )
}
