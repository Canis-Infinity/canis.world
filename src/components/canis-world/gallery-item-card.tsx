import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { shouldBypassImageOptimization } from "@/lib/asset-url"
import {
  formatCanisWorldDate,
  type GalleryItem,
} from "@/lib/canis-world-view-model"

type GalleryItemCardProps = {
  item: GalleryItem
  priority?: boolean
  sizes?: string
}

export function GalleryItemCard({
  item,
  priority = false,
  sizes = "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 86vw",
}: GalleryItemCardProps) {
  return (
    <Card className="h-full overflow-hidden py-0">
      <AspectRatio ratio={4 / 3}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={shouldBypassImageOptimization(item.image)}
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
  )
}
