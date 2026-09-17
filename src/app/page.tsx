import { Suspense } from "react"
import { HomeSkeleton } from "@/components/canis-world/home-skeleton"
import { AboutSection } from "@/components/canis-world/about-section"
import { DailySection } from "@/components/canis-world/daily-section"
import { FeatureCardsSection } from "@/components/canis-world/feature-cards-section"
import { GallerySection } from "@/components/canis-world/gallery-section"
import { HeroSection } from "@/components/canis-world/hero-section"
import { SiteFooter } from "@/components/canis-world/site-footer"
import { AgeGate } from "@/components/age-gate"
import { SiteHeader } from "@/components/site-header"
import { getCanisWorld } from "@/lib/canis-world"
import { createCanisWorldViewModel } from "@/lib/canis-world-view-model"

export default function HomePage() {
  return (
    <AgeGate>
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </AgeGate>
  )
}

async function HomeContent() {
  const data = await getCanisWorld()
  const viewModel = createCanisWorldViewModel(data)
  const heroEntry =
    viewModel.entries.find((entry) => entry._id === data.content.heroEntryId) ||
    viewModel.featuredEntry

  return (
    <main className="min-h-svh bg-background text-foreground">
      <SiteHeader
        linkLabel={data.content.headerLinkLabel}
        linkUrl={data.content.headerLinkUrl}
      />
      <HeroSection
        profile={data.profile}
        status={data.status}
        featuredEntry={heroEntry}
        heroImage={data.content.heroImage}
      />
      <DailySection
        status={data.status}
        content={data.content}
        featuredEntries={viewModel.featuredEntries}
        statusProgress={viewModel.statusProgress}
      />
      <GallerySection
        content={data.content}
        entries={viewModel.recentEntries}
        totalCount={viewModel.entries.length}
      />
      <AboutSection content={data.content} faqs={data.faqs} />
      <FeatureCardsSection cards={data.featureCards} />
      <SiteFooter footer={data.footer} />
    </main>
  )
}
