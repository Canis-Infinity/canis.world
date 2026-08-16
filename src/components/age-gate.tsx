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
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "canis-world-age-confirmed"

function hasConfirmedAge() {
  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) === "yes" ||
      window.sessionStorage.getItem(STORAGE_KEY) === "yes"
    )
  } catch {
    return false
  }
}

export function AgeGate({ children }: { children: ReactNode }) {
  // Keep the server render and the first client render locked, but do not
  // open the dialog until client storage confirms the visitor is unverified.
  const [locked, setLocked] = useState(true)
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hasConfirmedAge()) {
        setLocked(false)
      } else {
        setOpen(true)
      }
      setHydrated(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function confirmAge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "yes")
    } catch {
      // Confirmation still applies to the current page when storage is blocked.
    }

    setOpen(false)
    setLocked(false)
  }

  return (
    <>
      <div
        aria-hidden={locked}
        inert={locked}
        className={cn(
          "transition-[filter,opacity] duration-300",
          locked && "pointer-events-none opacity-45 blur-xl select-none"
        )}
      >
        {children}
      </div>

      {!hydrated && locked ? (
        <div data-slot="age-gate-fallback">
          <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs" />
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
