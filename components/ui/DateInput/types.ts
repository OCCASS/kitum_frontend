export type TEditableSegmentProps = {
    minValue: number
    maxValue: number
    maxLength: number
    setValue: (newValue: number) => void
    initialValue: number | null
    placeholder: string
    label: string
}

export type TDateInputProps = {
    name?: string
    initialDate?: Date | null
}