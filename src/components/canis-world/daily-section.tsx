"use client"

import { Heart, ShieldCheck, Star } from "lucide-react"
import { DailyEntryCard } from "@/components/canis-world/daily-entry-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Separator } from "@/components/ui/separator"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

type DailySectionProps = {
  status: CanisWorldData["status"]
  content: CanisWorldData["content"]
  featuredEntries: CanisWorldEntry[]
  statusProgress: number
}

function EntryGrid({ entries }: { entries: CanisWorldEntry[] }) {
  if (!entries.length) {
    return (
      <Empty className="col-span-full border">
        <EmptyHeader>
          <EmptyTitle>目前沒有精選日常</EmptyTitle>
          <EmptyDescription>
            其他日常仍可在照片牆與日常紀錄中查看。
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return entries.map((entry) => (
    <DailyEntryCard key={entry._id || entry.title} entry={entry} />
  ))
}

export function DailySection({
  status,
  content,
  featuredEntries,
  statusProgress,
}: DailySectionProps) {
  const visualStatusProgress = (statusProgress + 100) / 2

  return (
    <section id="daily" className="scroll-mt-16 border-y bg-muted/35">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit gap-1">
                <Heart className="size-3.5" />
                今日狀態
              </Badge>
              <CardTitle>{status.label}</CardTitle>
              <CardDescription>{status.note}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">心情</span>
                  <span className="font-medium">{status.mood}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">正在做</span>
                  <span className="text-right font-medium">{status.doing}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">出沒地點</span>
                  <span className="text-right font-medium">
                    {status.location}
                  </span>
                </div>
              </div>
              <Progress value={visualStatusProgress}>
                <ProgressLabel>今日狀態完整度</ProgressLabel>
                <ProgressValue>{() => `${statusProgress}%`}</ProgressValue>
              </Progress>
            </CardContent>
          </Card>

          <Alert>
            <ShieldCheck />
            <AlertTitle>{content.adultTitle}</AlertTitle>
            <AlertDescription>{content.adultDescription}</AlertDescription>
          </Alert>
        </div>

        <div className="grid min-w-0 content-start gap-4">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-current text-primary" />
            <h2 className="text-lg font-semibold">精選日常</h2>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <EntryGrid entries={featuredEntries} />
          </div>
        </div>
      </div>
    </section>
  )
}
