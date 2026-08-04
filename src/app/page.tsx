import Image from "next/image"
import Link from "next/link"
import {
  Bone,
  CalendarDays,
  Camera,
  ExternalLink,
  Heart,
  Home,
  MapPin,
  PawPrint,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { AgeGate } from "@/components/age-gate"
import { SectionLink } from "@/components/section-link"
import { SiteHeader } from "@/components/site-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getCanisWorld,
  resolveAssetUrl,
  type CanisWorldEntry,
} from "@/lib/canis-world"

function formatDate(value?: string) {
  if (!value) return "日常"
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value))
}

function entryImage(entry?: CanisWorldEntry) {
  return resolveAssetUrl(entry?.images?.[0] || "/og.png")
}

function DailyEntryCard({ entry }: { entry: CanisWorldEntry }) {
  return (
    <Card className="h-full overflow-hidden py-0">
      <AspectRatio ratio={4 / 3}>
        <Image
          src={entryImage(entry)}
          alt={entry.title}
          fill
          sizes="(min-width: 1024px) 28vw, 100vw"
          className="object-cover"
        />
      </AspectRatio>
      <CardHeader className="gap-2 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{entry.category || "日常"}</Badge>
          <Badge variant="outline" className="shrink-0">
            {formatDate(entry.occurredAt)}
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

export default async function HomePage() {
  const data = await getCanisWorld()
  const entries = [...(data.entries || [])].sort(
    (a, b) => (Number(a.priority) || 0) - (Number(b.priority) || 0)
  )
  const featured = entries.find((entry) => entry.featured) || entries[0]
  const gallery = entries.flatMap((entry) =>
    (entry.images || []).map((image) => ({
      image: resolveAssetUrl(image),
      title: entry.title,
      date: entry.occurredAt,
      category: entry.category || "日常",
      description:
        entry.excerpt || entry.content || "Canis 留下的一小段生活畫面。",
    }))
  )
  const statusProgress = Math.min(
    100,
    Math.max(0, Number(data.status.completeness) || 0)
  )

  return (
    <AgeGate>
      <main className="min-h-svh bg-background text-foreground">
        <SiteHeader
          linkLabel={data.content.headerLinkLabel}
          linkUrl={data.content.headerLinkUrl}
        />

        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div className="flex min-h-[calc(100svh-8rem)] flex-col justify-center gap-7">
            <HoverCard>
              <HoverCardTrigger
                render={
                  <SectionLink
                    href="#about"
                    className="w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                }
              >
                <span className="flex items-center gap-3">
                  <Avatar className="size-14 rounded-md">
                    <AvatarImage src="/avatar.jpg" alt="Canis avatar" />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <span>
                    <Badge variant="secondary" className="gap-1">
                      <Bone className="size-3.5" />
                      {data.profile.subtitle}
                    </Badge>
                    <span className="mt-3 block text-4xl font-semibold tracking-normal sm:text-6xl">
                      {data.profile.displayName}
                    </span>
                  </span>
                </span>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="w-72">
                <div className="flex gap-3">
                  <Avatar className="size-11 rounded-md">
                    <AvatarImage src="/avatar.jpg" alt="Canis avatar" />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium">{data.profile.displayName}</p>
                    <p className="mt-1 text-muted-foreground">
                      {data.status.doing || data.profile.intro}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              {data.profile.intro}
            </p>
            <div className="flex flex-wrap gap-2">
              {(data.profile.traits || []).map((trait) => (
                <Badge key={trait} variant="outline">
                  {trait}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={<SectionLink href="#daily" />}
              >
                <PawPrint className="size-4" />
                看今日 Canis
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="https://iistw.com/" />}
              >
                正式身分
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <Card className="overflow-hidden">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={entryImage(featured)}
                  alt={featured?.title || "Canis daily"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </AspectRatio>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="gap-1">
                    <Sparkles className="size-3.5" />
                    精選日常
                  </Badge>
                  <Badge variant="outline">
                    {formatDate(featured?.occurredAt)}
                  </Badge>
                </div>
                <CardTitle>{featured?.title || "今天還沒有留下足跡"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {featured?.excerpt ||
                    featured?.content ||
                    "Canis 今天還沒有留下文字。"}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="daily" className="scroll-mt-16 border-y bg-muted/35">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid content-start gap-4">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit gap-1">
                    <Heart className="size-3.5" />
                    今日狀態
                  </Badge>
                  <CardTitle>{data.status.label}</CardTitle>
                  <CardDescription>{data.status.note}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">心情</span>
                      <span className="font-medium">{data.status.mood}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">正在做</span>
                      <span className="text-right font-medium">
                        {data.status.doing}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">出沒地點</span>
                      <span className="text-right font-medium">
                        {data.status.location}
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
                <AlertTitle>{data.content.adultTitle}</AlertTitle>
                <AlertDescription>
                  {data.content.adultDescription}
                </AlertDescription>
              </Alert>
            </div>

            <Tabs defaultValue="all" className="min-w-0">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="featured">精選</TabsTrigger>
              </TabsList>
              <TabsContent
                value="all"
                className="mt-4 grid gap-4 sm:grid-cols-2"
              >
                {entries.length ? (
                  entries.map((entry) => (
                    <DailyEntryCard
                      key={entry._id || entry.title}
                      entry={entry}
                    />
                  ))
                ) : (
                  <Empty className="col-span-full border">
                    <EmptyHeader>
                      <EmptyTitle>今天還沒有新足跡</EmptyTitle>
                      <EmptyDescription>
                        Canis 可能正在外面晃，晚點再回來看看。
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </TabsContent>
              <TabsContent
                value="featured"
                className="mt-4 grid gap-4 sm:grid-cols-2"
              >
                {entries
                  .filter((entry) => entry.featured)
                  .map((entry) => (
                    <DailyEntryCard
                      key={entry._id || entry.title}
                      entry={entry}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section
          id="gallery"
          className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6"
        >
          <div className="mb-5">
            <Badge variant="secondary" className="mb-3 gap-1">
              <Camera className="size-3.5" />
              {data.content.galleryBadge}
            </Badge>
            <h2 className="text-2xl font-semibold">
              {data.content.galleryTitle}
            </h2>
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
                            {formatDate(item.date)}
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
                <EmptyDescription>
                  下一次出遊的照片會收進這裡。
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>

        <section id="about" className="scroll-mt-16 border-t bg-muted/25">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="secondary" className="mb-3 gap-1">
                <PawPrint className="size-3.5" />
                {data.content.aboutBadge}
              </Badge>
              <h2 className="text-2xl font-semibold">
                {data.content.aboutTitle}
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                {data.content.aboutDescription}
              </p>
            </div>
            <Accordion multiple>
              {data.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq._id || faq.question}
                  value={faq._id || `faq-${index}`}
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
            {data.featureCards.map((card) => {
              const icons = {
                home: Home,
                "map-pin": MapPin,
                calendar: CalendarDays,
                "paw-print": PawPrint,
                heart: Heart,
                camera: Camera,
              }
              const Icon = icons[card.icon || "home"] || Home
              return (
                <Card key={card._id || card.title}>
                  <CardHeader>
                    <Icon className="size-5 text-primary" />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        <footer className="border-t px-4 py-6 text-center text-xs leading-5 text-muted-foreground sm:px-6">
          <p>
            © 2026{" "}
            <Link
              href={data.footer.ownerUrl}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {data.footer.owner}
            </Link>
            <span aria-hidden="true"> · </span>
            {data.footer.rightsText}
          </p>
        </footer>
      </main>
    </AgeGate>
  )
}
