"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { RotateCcw, Search } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type GalleryPeriodFilterProps = {
  selectedFrom: string
  selectedTo: string
  selectedCategory: string
  selectedKeyword: string
  selectedSort: "newest" | "oldest"
  categories: string[]
}

function toDate(value: string) {
  return value ? parseISO(value) : undefined
}

export function GalleryPeriodFilter({
  selectedFrom,
  selectedTo,
  selectedCategory,
  selectedKeyword,
  selectedSort,
  categories,
}: GalleryPeriodFilterProps) {
  const router = useRouter()
  const [draftDate, setDraftDate] = useState<DateRange | undefined>({
    from: toDate(selectedFrom),
    to: toDate(selectedTo),
  })
  const [category, setCategory] = useState(selectedCategory)
  const [keyword, setKeyword] = useState(selectedKeyword)
  const [sort, setSort] = useState(selectedSort)
  const appliedDate: DateRange = {
    from: toDate(selectedFrom),
    to: toDate(selectedTo),
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draftDate?.from || !draftDate.to) return

    const params = new URLSearchParams({
      from: format(draftDate.from, "yyyy-MM-dd"),
      to: format(draftDate.to, "yyyy-MM-dd"),
    })
    if (category !== "all") params.set("category", category)
    if (keyword.trim()) params.set("q", keyword.trim())
    if (sort === "oldest") params.set("sort", sort)
    router.push(`/gallery?${params.toString()}`)
  }

  function clearFilters() {
    setDraftDate(appliedDate)
    setCategory("all")
    setKeyword("")
    setSort("newest")
  }

  return (
    <form
      className="mt-6 grid gap-4 rounded-md border bg-muted/20 p-4"
      aria-label="貼文日期篩選"
      onSubmit={applyFilters}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(16rem,1.35fr)_minmax(10rem,0.7fr)_minmax(14rem,1fr)_minmax(9rem,0.65fr)]">
        <DateRangePicker
          id="gallery-date-range"
          label="日期範圍"
          value={draftDate}
          onChange={setDraftDate}
        />
        <Field>
          <FieldLabel htmlFor="gallery-category">分類</FieldLabel>
          <Select value={category} onValueChange={(value) => setCategory(value || "all")}>
            <SelectTrigger id="gallery-category" className="w-full">
              <SelectValue>{category === "all" ? "所有分類" : category}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分類</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="gallery-keyword">關鍵字</FieldLabel>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="gallery-keyword"
              value={keyword}
              maxLength={100}
              className="pl-8"
              placeholder="搜尋標題或摘要"
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="gallery-sort">排序</FieldLabel>
          <Select value={sort} onValueChange={(value) => setSort(value === "oldest" ? "oldest" : "newest")}>
            <SelectTrigger id="gallery-sort" className="w-full">
              <SelectValue>{sort === "oldest" ? "由舊到新" : "由新到舊"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">由新到舊</SelectItem>
              <SelectItem value="oldest">由舊到新</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={clearFilters}>
          <RotateCcw data-icon="inline-start" />
          清除條件
        </Button>
        <Button
          type="submit"
          disabled={!draftDate?.from || !draftDate.to}
        >
          <Search data-icon="inline-start" />
          套用篩選
        </Button>
      </div>
    </form>
  )
}
