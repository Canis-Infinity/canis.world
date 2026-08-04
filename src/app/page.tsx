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

export default async function HomePage() {
  const data = await getCanisWorld()
  const viewModel = createCanisWorldViewModel(data)
  const heroEntry =
    viewModel.entries.find(
      (entry) => entry._id === data.content.heroEntryId
    ) || viewModel.featuredEntry

  return (
    <AgeGate>
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
          gallery={viewModel.galleryPreview}
          totalCount={viewModel.gallery.length}
        />
        <AboutSection content={data.content} faqs={data.faqs} />
        <FeatureCardsSection cards={data.featureCards} />
        <SiteFooter footer={data.footer} />
      </main>
    </AgeGate>
  )
}
