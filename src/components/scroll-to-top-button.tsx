"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight
      setVisible(
        scrollHeight > window.innerHeight + 120 && window.scrollY > 240
      )
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label="回到最上方"
            className={cn(
              "fixed right-5 bottom-5 z-40 rounded-full shadow-lg transition-all sm:right-6 sm:bottom-6",
              visible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            )}
            onClick={() => {
              if (window.location.hash) {
                window.history.replaceState(
                  null,
                  "",
                  `${window.location.pathname}${window.location.search}`
                )
              }
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        }
      >
        <ArrowUp className="size-4" />
      </TooltipTrigger>
      <TooltipContent>回到最上方</TooltipContent>
    </Tooltip>
  )
}
