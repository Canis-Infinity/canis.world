import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import {
  resolveAssetUrl,
  shouldBypassImageOptimization,
} from "@/lib/asset-url"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CanisWorldEntry } from "@/lib/canis-world-types"
import {
  formatCanisWorldDate,
  getCanisWorldEntryHref,
} from "@/lib/canis-world-view-model"

type DailyEntryCardProps = {
  entry: CanisWorldEntry
  priority?: boolean
  sizes?: string
}

export function DailyEntryCard({
  entry,
  priority = false,
  sizes = "(min-width: 1024px) 28vw, 100vw",
}: DailyEntryCardProps) {
  const image = resolveAssetUrl(entry.images?.[0] || "/og.png")

  return (
    <Link
      href={getCanisWorldEntryHref(entry)}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden py-0 transition-colors hover:ring-primary/60">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={entry.title}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={shouldBypassImageOptimization(image)}
            className="object-cover"
          />
        </AspectRatio>
        <CardHeader className="gap-2 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {entry.featured ? (
              <Badge className="gap-1">
                <Star className="size-3 fill-current" />
                精選
              </Badge>
            ) : null}
            <Badge variant="secondary">{entry.category || "日常"}</Badge>
            <Badge variant="outline" className="shrink-0">
              {formatCanisWorldDate(entry.occurredAt)}
            </Badge>
          </div>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {entry.excerpt || entry.content || "Canis 留下的一小段日常。"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
