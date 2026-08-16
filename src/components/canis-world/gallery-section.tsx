import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { DailyEntryCard } from "@/components/canis-world/daily-entry-card"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

type GallerySectionProps = {
  content: CanisWorldData["content"]
  entries: CanisWorldEntry[]
  totalCount: number
}

export function GallerySection({
  content,
  entries,
  totalCount,
}: GallerySectionProps) {
  const badgeLabel =
    content.galleryBadge === "照片牆" ? "貼文" : content.galleryBadge
  const sectionTitle =
    content.galleryTitle === "最近被帶回基地的畫面"
      ? "最近的日常貼文"
      : content.galleryTitle

  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6"
    >
      <div className="mb-5">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1">
            <Newspaper className="size-3.5" />
            {badgeLabel || "貼文"}
          </Badge>
          <h2 className="text-2xl font-semibold">
            {sectionTitle || "最近的日常貼文"}
          </h2>
          {totalCount > entries.length ? (
            <p className="mt-2 text-sm text-muted-foreground">
              首頁顯示最近 {entries.length} 篇，共有 {totalCount} 篇貼文。
            </p>
          ) : null}
        </div>
      </div>

      {entries.length ? (
        <Carousel opts={{ align: "start", loop: entries.length > 3 }}>
          <CarouselContent viewportClassName="p-1">
            {entries.map((entry, index) => (
              <CarouselItem
                key={entry._id || `${entry.title}-${index}`}
                className="basis-[86%] sm:basis-1/2 lg:basis-1/3"
              >
                <DailyEntryCard entry={entry} priority={index === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>目前還沒有貼文</EmptyTitle>
            <EmptyDescription>新的日常發佈後會出現在這裡。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/gallery" />}
        >
          查看所有貼文
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
