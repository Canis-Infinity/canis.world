"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "canis-world-age-confirmed"

export function AgeGate({ children }: { children: ReactNode }) {
  // Keep the server render and the first client render locked so protected
  // content is never readable before the dialog is ready.
  const [open, setOpen] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let confirmed = false

      try {
        confirmed = window.sessionStorage.getItem(STORAGE_KEY) === "yes"
      } catch {
        // Keep the gate open when browser storage is unavailable.
      }

      if (confirmed) setOpen(false)
      setHydrated(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function confirmAge() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "yes")
    } catch {
      // Confirmation still applies to the current page when storage is blocked.
    }

    setOpen(false)
  }

  return (
    <>
      <div
        aria-hidden={open}
        inert={open}
        className={cn(
          "transition-[filter,opacity] duration-300",
          open && "pointer-events-none opacity-45 blur-xl select-none"
        )}
      >
        {children}
      </div>

      {!hydrated && open ? (
        <div data-slot="age-gate-fallback">
          <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs" />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="age-gate-title"
            aria-describedby="age-gate-description"
            className="fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-popover-foreground shadow-lg ring-1 ring-foreground/10 sm:max-w-lg"
          >
            <div className="grid place-items-center gap-1.5 text-center sm:grid-cols-[auto_1fr] sm:place-items-start sm:gap-x-6 sm:text-left">
              <div className="mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:row-span-2">
                <ShieldCheck className="size-8 text-primary" />
              </div>
              <h2 id="age-gate-title" className="text-lg font-medium">
                進入前，先確認一件事
              </h2>
              <p
                id="age-gate-description"
                className="text-sm text-balance text-muted-foreground"
              >
                本站包含成人向的人型犬日常與創作內容。請確認你已達所在地的法定成年年齡，並願意繼續瀏覽。
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Link
                href="https://iistw.com/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto"
                )}
              >
                我尚未成年
              </Link>
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={confirmAge}
              >
                我已達法定年齡
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {hydrated && open ? (
        <AlertDialog open={open} onOpenChange={() => undefined}>
          <AlertDialogContent size="default">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <ShieldCheck className="size-8 text-primary" />
              </AlertDialogMedia>
              <AlertDialogTitle>進入前，先確認一件事</AlertDialogTitle>
              <AlertDialogDescription>
                本站包含成人向的人型犬日常與創作內容。請確認你已達所在地的法定成年年齡，並願意繼續瀏覽。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link
                href="https://iistw.com/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto"
                )}
              >
                我尚未成年
              </Link>
              <AlertDialogAction type="button" onClick={confirmAge}>
                我已達法定年齡
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  )
}
