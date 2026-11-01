"use client"

import { Heart, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react"
import { DailyEntryCard } from "@/components/canis-world/daily-entry-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

type DailySectionProps = {
  status: CanisWorldData["status"]
  content: CanisWorldData["content"]
  featuredEntries: CanisWorldEntry[]
  statusProgress: number
}

export function DailySection({
  status,
  content,
  featuredEntries,
  statusProgress,
}: DailySectionProps) {
  const visualStatusProgress = (statusProgress + 100) / 2

  return (
    <>
      <section
        id="daily"
        aria-labelledby="today-status-heading"
        className="scroll-mt-20 border-t"
      >
        <div className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6">
          <div className="grid gap-6 rounded-2xl border bg-card p-5 sm:p-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <div className="space-y-3">
              <Badge variant="secondary" className="gap-1.5">
                <Heart className="size-3.5" />
                今日狀態
              </Badge>
              <h2
                id="today-status-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                {status.label}
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {status.note}
              </p>
            </div>
            <div className="grid min-w-0 content-center gap-6">
              <dl className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                {[
                  { label: "心情", value: status.mood, icon: Heart },
                  { label: "正在做", value: status.doing, icon: Sparkles },
                  { label: "出沒地點", value: status.location, icon: MapPin },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-3 sm:block sm:space-y-2"
                  >
                    <dt className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="size-3.5" />
                      {label}
                    </dt>
                    <dd className="min-w-0 break-words text-right text-sm font-medium sm:text-left">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Progress value={visualStatusProgress}>
                <ProgressLabel>今日狀態完整度</ProgressLabel>
                <ProgressValue>{() => `${statusProgress}%`}</ProgressValue>
              </Progress>
            </div>
          </div>
          <Alert className="border-0 bg-transparent px-0">
            <ShieldCheck />
            <AlertTitle>{content.adultTitle}</AlertTitle>
            <AlertDescription>{content.adultDescription}</AlertDescription>
          </Alert>
        </div>
      </section>

      <section
        aria-labelledby="featured-heading"
        className="border-y bg-muted/35"
      >
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-current text-primary" />
            <h2 id="featured-heading" className="text-lg font-semibold">
              精選日常
            </h2>
          </div>
          {featuredEntries.length ? (
            <div className="flex flex-wrap justify-center gap-6">
              {featuredEntries.map((entry) => (
                <div
                  key={entry._id || entry.title}
                  className="min-w-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <DailyEntryCard
                    entry={entry}
                    sizes="(min-width: 1152px) 352px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Empty className="border">
              <EmptyHeader>
                <EmptyTitle>目前沒有精選日常</EmptyTitle>
                <EmptyDescription>
                  其他日常仍可在照片牆與日常紀錄中查看。
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </section>
    </>
  )
}
