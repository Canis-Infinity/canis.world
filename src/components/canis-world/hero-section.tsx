import Link from "next/link"
import { Bone, ExternalLink, PawPrint } from "lucide-react"
import { DailyEntryCard } from "@/components/canis-world/daily-entry-card"
import { SectionLink } from "@/components/section-link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import type { CanisWorldData, CanisWorldEntry } from "@/lib/canis-world-types"
import { resolveAssetUrl } from "@/lib/asset-url"

type HeroSectionProps = {
  profile: CanisWorldData["profile"]
  status: CanisWorldData["status"]
  featuredEntry: CanisWorldEntry
  heroImage?: string
}

export function HeroSection({
  profile,
  status,
  featuredEntry,
  heroImage,
}: HeroSectionProps) {
  const heroImageBelongsToEntry =
    heroImage && featuredEntry.images?.includes(heroImage)
  const heroEntry = heroImageBelongsToEntry
    ? { ...featuredEntry, images: [resolveAssetUrl(heroImage)] }
    : featuredEntry

  return (
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
              <Avatar className="size-20 rounded-md sm:size-24 lg:size-28">
                <AvatarImage src="/avatar.jpg" alt="Canis avatar" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <span>
                <Badge variant="secondary" className="gap-1">
                  <Bone className="size-3.5" />
                  {profile.subtitle}
                </Badge>
                <span className="mt-3 block text-5xl font-semibold tracking-normal sm:text-7xl lg:text-8xl">
                  {profile.displayName}
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
                <p className="font-medium">{profile.displayName}</p>
                <p className="mt-1 text-muted-foreground">
                  {status.doing || profile.intro}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          {profile.intro}
        </p>
        <div className="flex flex-wrap gap-2">
          {(profile.traits || []).map((trait) => (
            <Badge key={trait} variant="outline">
              {trait}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button nativeButton={false} render={<SectionLink href="#daily" />}>
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

      <div className="hidden content-center gap-4 lg:grid">
        <DailyEntryCard
          entry={heroEntry}
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </div>
    </section>
  )
}
