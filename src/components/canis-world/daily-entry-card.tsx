import Image from "next/image"
import { resolveAssetUrl } from "@/lib/asset-url"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CanisWorldEntry } from "@/lib/canis-world-types"
import { formatCanisWorldDate } from "@/lib/canis-world-view-model"

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
    <Card className="h-full overflow-hidden py-0">
      <AspectRatio ratio={4 / 3}>
        <Image
          src={image}
          alt={entry.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </AspectRatio>
      <CardHeader className="gap-2 pt-4">
        <div className="flex flex-wrap items-center gap-2">
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
  )
}
