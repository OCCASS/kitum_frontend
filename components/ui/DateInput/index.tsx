import React, { useEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import cn from "@/utils/cn";
import EditableSegment from "./EditableSegment";
import { TDateInputProps } from "./types";
import { formatDateToYYYYMMDD } from "@/utils/date";


const defaultClassName = "bg-secondary-bg px-3 py-2 rounded outline-none disabled:cursor-not-allowed disabled:text-gray-600"
const dateInput = cva(defaultClassName, {
    variants: {
        variant: {
            primary: "border border-primary-border-color disabled:border-gray-400",
            gray: "border border-gray-400 disabled:border-gray-500",
            none: "p-0 bg-transparent"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
})

export default function DateInput({ name, initialDate = null, variant, className, segmentClassName }: TDateInputProps) {
    // TODO: fix initialDate working, should work without useEffect. Problem may be in parent component
    const [value, setValue] = useState<{ day: number | null, month: number | null, year: number | null }>({
        day: null, month: null, year: null
    })
    const [dateValue, setDateValue] = useState<Date | null>(null)
    const dayRef = useRef<HTMLSpanElement>(null)
    const monthRef = useRef<HTMLSpanElement>(null)
    const yearRef = useRef<HTMLSpanElement>(null)

    const isValueEmpty = () => {
        return !value.day || !value.month || !value.year
    }

    useEffect(() => {
        if (!dateValue) setDateValue(initialDate)
        if (isValueEmpty() && initialDate) setValue({
            day: initialDate.getDate(),
            month: initialDate.getMonth() + 1,
            year: initialDate.getFullYear()
        })
    }, [initialDate]);

    useEffect(() => {
        if (!value.day || !value.month || !value.year) return
        setDateValue(new Date(value.year, value.month - 1, value.day))
    }, [value]);

    const onClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault()
        dayRef.current?.focus()
    }

    return (
        <div
            className={cn(dateInput({ variant: variant, className }))}
            tabIndex={-1}
            role="group"
            onMouseDown={onClick}
            onTouchStart={onClick}
        >
            <EditableSegment
                key="day"
                minValue={1}
                maxValue={31}
                maxLength={2}
                setValue={(newValue: number) => {
                    setValue(prev => ({ ...prev, day: newValue }))
                }}
                initialValue={value.day}
                placeholder="дд"
                label="День"
                innerRef={dayRef as React.RefObject<HTMLSpanElement>}
                focusNext={() => monthRef.current?.focus()}
                className={segmentClassName}
            />
            <span aria-hidden="true">.</span>
            <EditableSegment
                key="month"
                minValue={1}
                maxValue={12}
                maxLength={2}
                setValue={(newValue: number) => {
                    setValue(prev => ({ ...prev, month: newValue }))
                }}
                initialValue={value.month}
                placeholder="мм"
                label="Месяц"
                innerRef={monthRef as React.RefObject<HTMLSpanElement>}
                focusNext={() => yearRef.current?.focus()}
                className={segmentClassName}
            />
            <span aria-hidden="true">.</span>
            <EditableSegment
                key="year"
                minValue={1}
                maxValue={9999}
                maxLength={4}
                setValue={(newValue: number) => {
                    setValue(prev => ({ ...prev, year: newValue }))
                }}
                initialValue={value.year}
                placeholder="гггг"
                label="Год"
                innerRef={yearRef as React.RefObject<HTMLSpanElement>}
                className={segmentClassName}
            />
            <input name={name} type="hidden" defaultValue={dateValue ? formatDateToYYYYMMDD(dateValue) : ""} />
        </div>
    )
}
