"use client"

import type { ComponentProps, MouseEvent } from "react"
import Link from "next/link"

type SectionLinkProps = ComponentProps<typeof Link>

export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      typeof href !== "string" ||
      !href.startsWith("#")
    ) {
      return
    }

    const target = document.getElementById(decodeURIComponent(href.slice(1)))
    if (!target) return

    event.preventDefault()
    if (window.location.hash !== href) {
      window.history.pushState(null, "", href)
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
