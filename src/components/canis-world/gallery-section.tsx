import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"
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
import { GalleryItemCard } from "@/components/canis-world/gallery-item-card"
import type { CanisWorldData } from "@/lib/canis-world-types"
import type { GalleryItem } from "@/lib/canis-world-view-model"

type GallerySectionProps = {
  content: CanisWorldData["content"]
  gallery: GalleryItem[]
  totalCount: number
}

export function GallerySection({
  content,
  gallery,
  totalCount,
}: GallerySectionProps) {
  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6"
    >
      <div className="mb-5">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1">
            <Camera className="size-3.5" />
            {content.galleryBadge}
          </Badge>
          <h2 className="text-2xl font-semibold">{content.galleryTitle}</h2>
          {totalCount > gallery.length ? (
            <p className="mt-2 text-sm text-muted-foreground">
              首頁顯示最近 {gallery.length} 張，完整相簿共有 {totalCount} 張。
            </p>
          ) : null}
        </div>
      </div>

      {gallery.length ? (
        <Carousel opts={{ align: "start", loop: gallery.length > 3 }}>
          <CarouselContent>
            {gallery.map((item, index) => (
              <CarouselItem
                key={`${item.image}-${index}`}
                className="basis-[86%] sm:basis-1/2 lg:basis-1/3"
              >
                <GalleryItemCard item={item} priority={index === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 z-10 bg-background/90 hover:bg-background active:bg-background dark:bg-background/90 dark:hover:bg-background dark:active:bg-background" />
          <CarouselNext className="right-3 z-10 bg-background/90 hover:bg-background active:bg-background dark:bg-background/90 dark:hover:bg-background dark:active:bg-background" />
        </Carousel>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>相簿還是空的</EmptyTitle>
            <EmptyDescription>下一次出遊的照片會收進這裡。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/gallery" />}
        >
          查看更多
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
