import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

type DailyMarkdownProps = {
  content: string
  className?: string
}

export function DailyMarkdown({ content, className }: DailyMarkdownProps) {
  return (
    <div
      className={cn(
        "grid gap-5 text-base leading-8 text-foreground/90",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const isInternal = href.startsWith("/")

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {children}
                </Link>
              )
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {children}
              </a>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/60 pl-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm">
              {children}
            </code>
          ),
          h2: ({ children }) => (
            <h2 className="pt-3 text-2xl font-semibold leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-2 text-xl font-semibold leading-tight">
              {children}
            </h3>
          ),
          hr: () => <hr className="border-border" />,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          ol: ({ children }) => (
            <ol className="grid list-decimal gap-2 pl-6">{children}</ol>
          ),
          p: ({ children }) => <p>{children}</p>,
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-6">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          td: ({ children }) => (
            <td className="border-t px-3 py-2 align-top">{children}</td>
          ),
          th: ({ children }) => (
            <th className="bg-muted px-3 py-2 text-left font-medium">
              {children}
            </th>
          ),
          ul: ({ children }) => (
            <ul className="grid list-disc gap-2 pl-6">{children}</ul>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
