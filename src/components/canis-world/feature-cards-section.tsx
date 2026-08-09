import { Home } from "lucide-react"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { CanisWorldData } from "@/lib/canis-world-types"

const iconNameSet = new Set<string>(["home", "map-pin", "calendar"])

function FeatureIcon({ name }: { name?: string }) {
  if (!name || !iconNameSet.has(name)) {
    return <Home className="size-5 text-primary" />
  }

  return <DynamicIcon name={name as IconName} className="size-5 text-primary" />
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
          return (
            <Card key={card._id || card.title}>
              <CardHeader>
                <FeatureIcon name={card.icon} />
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
