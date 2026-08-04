"use client"

import Link from "next/link"
import { Home, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type ErrorStateProps = {
  code: string
  title: string
  description: string
  onRetry?: () => void
}

export function ErrorState({
  code,
  title,
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Avatar className="size-9 rounded-md border">
              <AvatarImage src="/avatar.jpg" alt="Canis" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <span>Canis World</span>
          </Link>
        </div>
      </header>
      <Empty className="mx-auto min-h-[calc(100svh-4rem)] max-w-2xl rounded-none px-4 py-16 sm:px-6">
        <EmptyHeader>
          <EmptyMedia>
            <Badge variant="secondary" className="font-mono">
              {code}
            </Badge>
          </EmptyMedia>
          <EmptyTitle className="text-xl">{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row flex-wrap justify-center gap-2">
          {onRetry ? (
            <Button type="button" onClick={onRetry}>
              <RefreshCw className="size-4" />
              再試一次
            </Button>
          ) : null}
          <Button
            nativeButton={false}
            variant={onRetry ? "outline" : "default"}
            render={<Link href="/" />}
          >
            <Home className="size-4" />
            回到首頁
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
