import {
  CalendarDays,
  Camera,
  Heart,
  Home,
  MapPin,
  PawPrint,
  type LucideIcon,
} from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { CanisWorldData } from "@/lib/canis-world-types"

const featureIcons: Record<
  NonNullable<CanisWorldData["featureCards"][number]["icon"]>,
  LucideIcon
> = {
  home: Home,
  "map-pin": MapPin,
  calendar: CalendarDays,
  "paw-print": PawPrint,
  heart: Heart,
  camera: Camera,
}

export function FeatureCardsSection({
  cards,
}: {
  cards: CanisWorldData["featureCards"]
}) {
  return (
    <section className="border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = featureIcons[card.icon || "home"] || Home

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
  )
}
