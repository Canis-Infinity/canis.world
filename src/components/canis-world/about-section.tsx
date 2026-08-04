import { PawPrint } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { CanisWorldData } from "@/lib/canis-world-types"

type AboutSectionProps = {
  content: CanisWorldData["content"]
  faqs: CanisWorldData["faqs"]
}

export function AboutSection({ content, faqs }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-16 border-t bg-muted/25">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1">
            <PawPrint className="size-3.5" />
            {content.aboutBadge}
          </Badge>
          <h2 className="text-2xl font-semibold">{content.aboutTitle}</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
            {content.aboutDescription}
          </p>
        </div>
        <Accordion multiple>
          {faqs.map((faq, index) => (
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
  )
}
