import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader({
  linkLabel,
  linkUrl,
}: {
  linkLabel: string
  linkUrl: string
}) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Avatar className="size-9 overflow-hidden rounded-md border">
            <AvatarImage
              src="/avatar.jpg"
              alt="Canis"
              className="rounded-md object-cover"
            />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <span>Canis World</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            render={<Link href={linkUrl} />}
          >
            {linkLabel}
            <ExternalLink className="size-3.5" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
