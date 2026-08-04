import Image from "next/image"
import { Camera } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import type { CanisWorldData } from "@/lib/canis-world-types"
import {
  formatCanisWorldDate,
  type GalleryItem,
} from "@/lib/canis-world-view-model"

type GallerySectionProps = {
  content: CanisWorldData["content"]
  gallery: GalleryItem[]
}

export function GallerySection({ content, gallery }: GallerySectionProps) {
  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6"
    >
      <div className="mb-5">
        <Badge variant="secondary" className="mb-3 gap-1">
          <Camera className="size-3.5" />
          {content.galleryBadge}
        </Badge>
        <h2 className="text-2xl font-semibold">{content.galleryTitle}</h2>
      </div>

      {gallery.length ? (
        <Carousel opts={{ align: "start", loop: gallery.length > 3 }}>
          <CarouselContent>
            {gallery.slice(0, 12).map((item, index) => (
              <CarouselItem
                key={`${item.image}-${index}`}
                className="basis-[86%] sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full overflow-hidden py-0">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 86vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </AspectRatio>
                  <CardHeader className="gap-2 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="outline" className="shrink-0">
                        {formatCanisWorldDate(item.date)}
                      </Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
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
    </section>
  )
}
