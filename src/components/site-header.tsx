import Link from "next/link"
import { ExternalLink, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { SectionLink } from "@/components/section-link"

const navigation = [
  { label: "日常", href: "#daily" },
  { label: "照片", href: "#gallery" },
  { label: "關於", href: "#about" },
]

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
          <Avatar className="size-9 rounded-md border">
            <AvatarImage src="/avatar.jpg" alt="Canis" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <span>Canis World</span>
        </Link>

        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink render={<SectionLink href={item.href} />}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            render={<Link href={linkUrl} />}
          >
            {linkLabel}
            <ExternalLink className="size-3.5" />
          </Button>
          <ModeToggle />
          <Sheet>
            <SheetTrigger
              className="sm:hidden"
              render={
                <Button variant="outline" size="icon" aria-label="開啟導覽" />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Canis World</SheetTitle>
                <SheetDescription>想先去哪裡晃晃？</SheetDescription>
              </SheetHeader>
              <Separator />
              <nav className="grid gap-1 px-2">
                {navigation.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    className="flex h-9 items-center rounded-md px-2.5 text-sm font-medium hover:bg-muted"
                    render={<SectionLink href={item.href} />}
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button
                  nativeButton={false}
                  className="w-full"
                  render={<Link href={linkUrl} />}
                >
                  {linkLabel}
                  <ExternalLink className="size-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
