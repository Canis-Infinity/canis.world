"use client"

import { format } from "date-fns"
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
import { cn } from "@/lib/utils"

type DateRangePickerProps = {
  id: string
  label: string
  value?: DateRange
  onChange: (value: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  id,
  label,
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  return (
    <Field className={cn("w-full", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              className="w-full justify-start px-2.5 text-left font-normal"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "PPP", { locale: zhTW })} -{" "}
                {format(value.to, "PPP", { locale: zhTW })}
              </>
            ) : (
              format(value.from, "PPP", { locale: zhTW })
            )
          ) : (
            <span className="text-muted-foreground">選擇日期範圍</span>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto max-w-[calc(100vw-2rem)] overflow-x-auto p-0"
          align="start"
        >
          <Calendar
            mode="range"
            locale={zhTW}
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            max={366}
            className="max-sm:[&_.rdp-month:nth-child(2)]:hidden"
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
