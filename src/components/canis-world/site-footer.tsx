import Link from "next/link"
import type { CanisWorldData } from "@/lib/canis-world-types"

export function SiteFooter({ footer }: { footer: CanisWorldData["footer"] }) {
  return (
    <footer className="border-t px-4 py-6 text-center text-xs leading-5 text-muted-foreground sm:px-6">
      <p>
        © 2026{" "}
        <Link
          href={footer.ownerUrl}
          className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {footer.owner}
        </Link>
        <span aria-hidden="true"> · </span>
        {footer.rightsText}
      </p>
    </footer>
  )
}
