import React from "react";

type TDateInputVariant = "primary" | "gray" | "none"

export type TEditableSegmentProps = {
    minValue: number
    maxValue: number
    maxLength: number
    setValue: (newValue: number) => void
    initialValue: number | null
    placeholder: string
    label: string,
    innerRef?: React.RefObject<HTMLSpanElement>
    focusNext?: () => void,
    className?: string
}

export type TDateInputProps = {
    name?: string
    initialDate?: Date | null,
    variant?: TDateInputVariant
    className?: string
    segmentClassName?: string
}