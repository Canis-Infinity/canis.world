import { Heart, ShieldCheck } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"

type DailySectionProps = {
  status: CanisWorldData["status"]
  content: CanisWorldData["content"]
  entries: CanisWorldEntry[]
  featuredEntries: CanisWorldEntry[]
  statusProgress: number
}

function EntryGrid({ entries }: { entries: CanisWorldEntry[] }) {
  if (!entries.length) {
    return (
      <Empty className="col-span-full border">
        <EmptyHeader>
          <EmptyTitle>今天還沒有新足跡</EmptyTitle>
          <EmptyDescription>
            Canis 可能正在外面晃，晚點再回來看看。
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
  entries,
  featuredEntries,
  statusProgress,
}: DailySectionProps) {
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
              <Progress value={statusProgress}>
                <ProgressLabel>今日狀態完整度</ProgressLabel>
                <ProgressValue />
              </Progress>
            </CardContent>
          </Card>

          <Alert>
            <ShieldCheck />
            <AlertTitle>{content.adultTitle}</AlertTitle>
            <AlertDescription>{content.adultDescription}</AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="all" className="min-w-0">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="featured">精選</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 grid gap-4 sm:grid-cols-2">
            <EntryGrid entries={entries} />
          </TabsContent>
          <TabsContent
            value="featured"
            className="mt-4 grid gap-4 sm:grid-cols-2"
          >
            <EntryGrid entries={featuredEntries} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
