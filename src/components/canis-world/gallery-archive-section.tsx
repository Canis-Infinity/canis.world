"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { BookOpen, CalendarRange, Camera, ChevronLeft, ChevronRight, ImageIcon, ImageOff } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  GalleryPeriodFilter,
} from "@/components/canis-world/gallery-period-filter"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  formatCanisWorldDate,
  type GalleryEntryGroup,
} from "@/lib/canis-world-view-model"

const GROUP_BATCH_SIZE = 8

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
  const [visibleGroupCount, setVisibleGroupCount] = useState(GROUP_BATCH_SIZE)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const visibleGroups = useMemo(
    () => groups.slice(0, visibleGroupCount),
    [groups, visibleGroupCount]
  )
  const previewItems = useMemo(
    () => groups.flatMap((group) => group.items),
    [groups]
  )
  const previewItem = previewIndex === null ? null : previewItems[previewIndex]
  const hasMore = visibleGroupCount < groups.length

  function movePreview(direction: -1 | 1) {
    if (previewIndex === null || previewItems.length < 2) return
    setPreviewIndex(
      (previewIndex + direction + previewItems.length) % previewItems.length
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-3 gap-1">
            <Camera className="size-3.5" />
            完整相簿
          </Badge>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            被帶回基地的所有畫面
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            依照每篇日常的標題與日期整理，新的畫面會排在前面。
          </p>
        </div>
        <GalleryPeriodFilter
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          selectedCategory={selectedCategory}
          selectedKeyword={selectedKeyword}
          selectedSort={selectedSort}
          categories={categories}
        />
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground" aria-label="篩選結果摘要">
          <span className="inline-flex items-center gap-1.5">
            <CalendarRange className="size-4" />
            {rangeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ImageIcon className="size-4" />
            {totalCount} 張照片
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4" />
            {groups.length} 篇日常紀錄
          </span>
        </div>
      </div>

      {visibleGroups.length ? (
        <div className="grid gap-10">
          {visibleGroups.map((group, groupIndex) => (
            <article key={group.key} className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-3">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{group.category}</Badge>
                    <Badge variant="outline">
                      {formatCanisWorldDate(group.date)}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-semibold">{group.title}</h2>
                  {group.description ? (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {group.description}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {group.items.length} 張照片
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <button
                    key={`${group.key}-${item.image}-${index}`}
                    type="button"
                    className="group overflow-hidden rounded-lg border bg-muted text-left outline-none transition-colors hover:border-foreground/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                    onClick={() => setPreviewIndex(previewItems.indexOf(item))}
                    aria-label={`放大預覽：${item.title}`}
                  >
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={groupIndex === 0 && index < 2}
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                        className="cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </button>
                ))}
              </div>
            </article>
          ))}

          {hasMore ? (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setVisibleGroupCount((count) => count + GROUP_BATCH_SIZE)
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
            <EmptyMedia variant="icon">
              <ImageOff />
            </EmptyMedia>
            <EmptyTitle>沒有符合條件的照片</EmptyTitle>
            <EmptyDescription>可以調整日期、分類或搜尋關鍵字。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <Dialog
        open={previewItem !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setPreviewIndex(null)
        }}
      >
        <DialogContent
          className="h-[min(90svh,900px)] max-w-[calc(100%-1rem)] grid-rows-[minmax(0,1fr)_auto] gap-0 overflow-hidden bg-black p-0 text-white ring-white/15 sm:max-w-6xl"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") movePreview(-1)
            if (event.key === "ArrowRight") movePreview(1)
          }}
        >
          <DialogTitle className="sr-only">
            {previewItem?.title || "照片預覽"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            使用左右方向鍵切換照片。
          </DialogDescription>
          {previewItem ? (
            <>
              <div className="relative min-h-0 flex-1">
                <Image
                  src={previewItem.image}
                  alt={previewItem.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-sm">
                <span className="min-w-0 truncate">{previewItem.title}</span>
                <span className="shrink-0 text-white/65">
                  {(previewIndex || 0) + 1} / {previewItems.length}
                </span>
              </div>
              {previewItems.length > 1 ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute inset-y-0 left-3 my-auto touch-manipulation rounded-full bg-black/55 text-white hover:bg-black/75 hover:text-white active:bg-black/75"
                    onClick={() => movePreview(-1)}
                    aria-label="上一張照片"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute inset-y-0 right-3 my-auto touch-manipulation rounded-full bg-black/55 text-white hover:bg-black/75 hover:text-white active:bg-black/75"
                    onClick={() => movePreview(1)}
                    aria-label="下一張照片"
                  >
                    <ChevronRight />
                  </Button>
                </>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
