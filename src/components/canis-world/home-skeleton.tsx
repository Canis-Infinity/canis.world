import { Skeleton } from "@/components/ui/skeleton"

function EntrySkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="首頁載入中"
      className="min-h-svh bg-background text-foreground [&_[data-slot=skeleton]]:motion-reduce:animate-none"
    >
      <p role="status" className="sr-only">
        正在載入首頁，請稍候。
      </p>
      <div aria-hidden="true">
        <div className="border-b">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Skeleton className="size-7" />
              <span className="font-semibold">Canis World</span>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="size-8" />
            </div>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div className="flex min-h-[calc(100svh-8rem)] flex-col justify-center gap-7">
            <div className="flex items-center gap-3">
              <Skeleton className="size-20 shrink-0 sm:size-24 lg:size-28" />
              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-5 w-32 max-w-full" />
                <Skeleton className="h-12 w-48 max-w-full sm:h-18 lg:h-24" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-5 w-16" />
              ))}
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
          <div className="hidden content-center lg:grid">
            <EntrySkeleton />
          </div>
        </div>
        <div className="border-y bg-muted/35">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5 rounded-lg border bg-card p-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-7 w-1/2" />
              {[0, 1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-5 w-full" />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <EntrySkeleton />
              <EntrySkeleton />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl space-y-5 px-4 py-10 sm:px-6">
          <Skeleton className="h-7 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <EntrySkeleton />
            <div className="hidden sm:block">
              <EntrySkeleton />
            </div>
            <div className="hidden lg:block">
              <EntrySkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
