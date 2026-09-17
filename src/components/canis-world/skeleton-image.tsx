"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SkeletonImage(props: ImageProps) {
  const imageKey =
    typeof props.src === "string" ? props.src : JSON.stringify(props.src)
  return <LoadingImage key={imageKey} {...props} />
}

function LoadingImage({
  alt,
  className,
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading")

  return (
    <>
      {state === "loading" ? (
        <Skeleton
          aria-hidden="true"
          className="absolute inset-0 rounded-none motion-reduce:animate-none"
        />
      ) : null}
      {state === "error" ? (
        <div
          role="img"
          aria-label={`${alt}（圖片暫時無法載入）`}
          className="absolute inset-0 flex items-center justify-center bg-muted p-4 text-sm text-muted-foreground"
        >
          圖片暫時無法載入
        </div>
      ) : null}
      <Image
        {...props}
        alt={alt}
        className={cn(className, state !== "loaded" && "opacity-0")}
        onLoad={(event) => {
          setState("loaded")
          onLoad?.(event)
        }}
        onError={(event) => {
          setState("error")
          onError?.(event)
        }}
        aria-hidden={state === "error" ? true : undefined}
      />
    </>
  )
}
