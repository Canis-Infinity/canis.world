"use client"

import { Suspense } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { VisitTracker } from "@/components/visit-tracker"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        {children}
        <Suspense fallback={null}>
          <VisitTracker />
        </Suspense>
        <Toaster />
      </TooltipProvider>
    </NextThemesProvider>
  )
}
