import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, Heart } from "lucide-react"

import { AgeGate } from "@/components/age-gate"
import { DailyImageGallery } from "@/components/canis-world/daily-image-gallery"
import { DailyMarkdown } from "@/components/canis-world/daily-markdown"
import { SiteFooter } from "@/components/canis-world/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getCanisWorld } from "@/lib/canis-world"
import {
  formatCanisWorldDate,
  getCanisWorldEntryKey,
} from "@/lib/canis-world-view-model"

type DailyEntryPageProps = {
  params: Promise<{
    entryId: string
  }>
}

export default async function DailyEntryPage({ params }: DailyEntryPageProps) {
  const { entryId } = await params
  const data = await getCanisWorld()
  const decodedEntryId = decodeURIComponent(entryId)
  const entry = data.entries.find(
    (item, index) => getCanisWorldEntryKey(item, index) === decodedEntryId
  )

  if (!entry) notFound()

  const images = entry.images?.length ? entry.images : ["/og.png"]
  const content = entry.content || entry.excerpt || "Canis 留下了一段日常。"

  return (
    <AgeGate>
      <main className="min-h-svh bg-background text-foreground">
        <SiteHeader
          linkLabel={data.content.headerLinkLabel}
          linkUrl={data.content.headerLinkUrl}
        />
        <article className="mx-auto grid w-full max-w-4xl gap-8 px-4 py-8 sm:px-6 lg:py-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  首頁
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/#daily" />}>
                  日常紀錄
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{entry.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{entry.category || "日常"}</Badge>
              <Badge variant="outline" className="gap-1">
                <CalendarDays className="size-3.5" />
                {formatCanisWorldDate(entry.occurredAt)}
              </Badge>
              {entry.mood ? (
                <Badge variant="outline" className="gap-1">
                  <Heart className="size-3.5" />
                  {entry.mood}
                </Badge>
              ) : null}
            </div>
            <div className="grid gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-pretty sm:text-4xl">
                {entry.title}
              </h1>
              {entry.excerpt ? (
                <p className="text-lg leading-8 text-muted-foreground">
                  {entry.excerpt}
                </p>
              ) : null}
            </div>
            {entry.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </header>

          <DailyMarkdown content={content} />

          <DailyImageGallery images={images} title={entry.title} />
        </article>
        <SiteFooter footer={data.footer} />
      </main>
    </AgeGate>
  )
}
