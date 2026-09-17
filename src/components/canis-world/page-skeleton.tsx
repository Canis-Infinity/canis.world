import { Skeleton } from "@/components/ui/skeleton"
import { EntrySkeleton } from "@/components/canis-world/entry-skeleton"

export function PageSkeleton({ detail = false }: { detail?: boolean }) {
  return (
    <main aria-busy="true" className="min-h-svh bg-background text-foreground">
      <p role="status" className="sr-only">
        {detail ? "正在載入貼文，請稍候。" : "正在載入貼文列表，請稍候。"}
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
        <div
          className={`mx-auto space-y-8 px-4 py-10 sm:px-6 ${detail ? "max-w-4xl" : "max-w-6xl"}`}
        >
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-80 max-w-full" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>
          {detail ? (
            <>
              <Skeleton className="aspect-[4/3] w-full lg:aspect-[16/10]" />
              <div className="space-y-4">
                {[0, 1, 2, 3].map((index) => (
                  <Skeleton key={index} className="h-5 w-full" />
                ))}
                <Skeleton className="h-5 w-2/3" />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-3 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <EntrySkeleton key={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
