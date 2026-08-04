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
      (!href.startsWith("#") && !href.startsWith("/#"))
    ) {
      return
    }

    const targetUrl = new URL(href, window.location.href)
    if (targetUrl.pathname !== window.location.pathname) return

    const target = document.getElementById(
      decodeURIComponent(targetUrl.hash.slice(1))
    )
    if (!target) return

    event.preventDefault()
    if (window.location.hash !== targetUrl.hash) {
      window.history.pushState(null, "", targetUrl.hash)
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
