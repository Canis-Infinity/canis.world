"use client"

import Image from "next/image"
import { Expand } from "lucide-react"
import * as React from "react"

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  resolveAssetUrl,
  shouldBypassImageOptimization,
} from "@/lib/asset-url"
import { cn } from "@/lib/utils"

type DailyImageGalleryProps = {
  images: string[]
  title: string
}

type GalleryImage = {
  alt: string
  src: string
}

export function DailyImageGallery({ images, title }: DailyImageGalleryProps) {
  const galleryImages = images.map((image, index) => ({
    alt: `${title}照片 ${index + 1}`,
    src: resolveAssetUrl(image),
  }))
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewIndex, setPreviewIndex] = React.useState(0)
  const [previewApi, setPreviewApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!previewApi || !previewOpen) return

    const updatePreviewIndex = () => {
      setPreviewIndex(previewApi.selectedScrollSnap())
    }

    updatePreviewIndex()
    previewApi.on("select", updatePreviewIndex)
    previewApi.on("reInit", updatePreviewIndex)

    return () => {
      previewApi.off("select", updatePreviewIndex)
      previewApi.off("reInit", updatePreviewIndex)
    }
  }, [previewApi, previewOpen])

  function openPreview(index: number) {
    if (previewOpen) return
    setPreviewIndex(index)
    setPreviewOpen(true)
  }

  function closePreview(open: boolean) {
    setPreviewOpen(open)
    if (!open) setPreviewApi(undefined)
  }

  return (
    <>
      <section aria-label={`${title}照片`} className="grid gap-4">
        <MobileImageList
          images={galleryImages}
        />
        <DesktopImageGrid
          images={galleryImages}
          title={title}
          onOpen={openPreview}
        />
      </section>

      <Dialog open={previewOpen} onOpenChange={closePreview}>
        <DialogContent
          className="h-[min(92svh,900px)] max-w-[calc(100%-1rem)] grid-rows-[minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-lg bg-black p-0 text-white ring-white/15 sm:max-w-6xl"
          showCloseButton
        >
          <DialogTitle className="sr-only">{title}照片檢視</DialogTitle>
          <DialogDescription className="sr-only">
            使用左右方向鍵切換照片，或按關閉按鈕返回日常紀錄。
          </DialogDescription>

          <Carousel
            className="relative h-full min-h-0 [&_[data-slot=carousel-content]]:h-full"
            opts={{ loop: galleryImages.length > 1, startIndex: previewIndex }}
            setApi={setPreviewApi}
          >
            <CarouselContent className="ml-0 h-full">
              {galleryImages.map((image, index) => (
                <CarouselItem
                  key={`${image.src}-preview-${index}`}
                  className="h-full pl-0"
                >
                  <div className="relative h-full min-h-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      unoptimized={shouldBypassImageOptimization(image.src)}
                      className="pointer-events-none object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {galleryImages.length > 1 ? (
              <>
                <CarouselPrevious className="left-4 z-20" />
                <CarouselNext className="right-4 z-20" />
              </>
            ) : null}
          </Carousel>

          <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/85 px-4 py-3 text-sm">
            <span className="min-w-0 truncate text-white/80">{title}</span>
            <span className="shrink-0 text-white/60">
              {previewIndex + 1} / {galleryImages.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function MobileImageList({
  images,
}: {
  images: GalleryImage[]
}) {
  return (
    <div className="grid gap-4 lg:hidden">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            unoptimized={shouldBypassImageOptimization(image.src)}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

function DesktopImageGrid({
  images,
  title,
  onOpen,
}: {
  images: GalleryImage[]
  title: string
  onOpen: (index: number) => void
}) {
  return (
    <div
      className={cn(
        "hidden gap-3 lg:grid",
        images.length === 1
          ? "grid-cols-1"
          : "grid-cols-6 auto-rows-[minmax(10rem,13vw)]"
      )}
    >
      {images.map((image, index) => (
        <GalleryImageButton
          key={`${image.src}-${index}`}
          image={image}
          title={title}
          index={index}
          priority={index === 0}
          className={getDesktopTileClass(images.length, index)}
          sizes={
            images.length === 1
              ? "(min-width: 1024px) 896px, 100vw"
              : index === 0
                ? "(min-width: 1024px) 590px, 100vw"
                : "(min-width: 1024px) 290px, 100vw"
          }
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}

function GalleryImageButton({
  image,
  title,
  index,
  priority,
  className,
  sizes,
  onOpen,
}: {
  image: GalleryImage
  title: string
  index: number
  priority: boolean
  className: string
  sizes: string
  onOpen: (index: number) => void
}) {
  return (
    <button
      type="button"
      className={cn(
        "group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-muted text-left outline-none transition focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      onClick={() => onOpen(index)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={shouldBypassImageOptimization(image.src)}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
      <span className="absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" />
        <span className="sr-only">放大檢視{title}第 {index + 1} 張照片</span>
      </span>
    </button>
  )
}

function getDesktopTileClass(count: number, index: number) {
  if (count === 1) return "aspect-[16/10]"
  if (count === 2) return "col-span-3 row-span-2"

  const classes = [
    "col-span-4 row-span-2",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-3 row-span-1",
    "col-span-3 row-span-1",
    "col-span-2 row-span-1",
  ]

  return classes[index % classes.length]
}
