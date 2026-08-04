"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { zhTW } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type GalleryPeriodFilterProps = {
  selectedFrom: string
  selectedTo: string
}

function toDate(value: string) {
  return value ? parseISO(value) : undefined
}

export function GalleryPeriodFilter({
  selectedFrom,
  selectedTo,
}: GalleryPeriodFilterProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState<DateRange | undefined>({
    from: toDate(selectedFrom),
    to: toDate(selectedTo),
  })
  const appliedDate: DateRange = {
    from: toDate(selectedFrom),
    to: toDate(selectedTo),
  }

  useEffect(() => {
    setDraftDate({
      from: toDate(selectedFrom),
      to: toDate(selectedTo),
    })
  }, [selectedFrom, selectedTo])

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen)
    setDraftDate(appliedDate)
  }

  function applyRange() {
    if (!draftDate?.from || !draftDate.to) return

    const params = new URLSearchParams({
      from: format(draftDate.from, "yyyy-MM-dd"),
      to: format(draftDate.to, "yyyy-MM-dd"),
    })
    setOpen(false)
    router.push(`/gallery?${params.toString()}`)
  }

  return (
    <Field className="mt-6 w-fit">
      <FieldLabel htmlFor="gallery-date-range">日期範圍</FieldLabel>
      <Popover open={open} onOpenChange={changeOpen}>
        <PopoverTrigger
          render={
            <Button
              id="gallery-date-range"
              variant="outline"
              className="w-full justify-start px-2.5 font-normal sm:w-72"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {appliedDate.from ? (
            appliedDate.to ? (
              <>
                {format(appliedDate.from, "yyyy/MM/dd")} -{" "}
                {format(appliedDate.to, "yyyy/MM/dd")}
              </>
            ) : (
              format(appliedDate.from, "yyyy/MM/dd")
            )
          ) : (
            <span>選擇日期範圍</span>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto max-w-[calc(100vw-2rem)] overflow-x-auto p-0"
          align="start"
        >
          <Calendar
            mode="range"
            locale={zhTW}
            defaultMonth={draftDate?.from}
            selected={draftDate}
            onSelect={setDraftDate}
            numberOfMonths={2}
            max={366}
          />
          <div className="flex items-center justify-end gap-2 border-t p-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => changeOpen(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              disabled={!draftDate?.from || !draftDate.to}
              onClick={applyRange}
            >
              套用
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
