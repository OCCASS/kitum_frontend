import React, {useEffect, useRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import {TEditableSegmentProps} from "./types";

export default function EditableSegment({
                                            minValue,
                                            maxValue,
                                            maxLength,
                                            setValue,
                                            initialValue,
                                            placeholder,
                                            label
                                        }: TEditableSegmentProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [curValue, setCurValue] = useState("")

    useEffect(() => {
        if (!curValue) setCurValue(initialValue ? initialValue.toString() : "")
    }, [initialValue]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key !== "Tab") e.preventDefault()
        if (e.key === "Backspace" && ref.current) {
            setCurValue("")
        }
        if (/[0-9]/.test(e.key) && ref.current) {
            const newValue = curValue.length < maxLength ? curValue + e.key : curValue
            setCurValue(newValue)
            setValue(parseInt(newValue, 10))
        }
    }

    return (
        <span
            ref={ref}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onKeyDown={onKeyDown}
            role="spinbutton"
            tabIndex={0}
            aria-valuenow={curValue !== "" ? parseInt(curValue, 10) : undefined}
            aria-valuetext={curValue}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-label={label}
            spellCheck={false}
            autoCorrect="off"
            inputMode="numeric"
            className={twMerge("p-0.5 caret-transparent focus:outline-none focus:bg-tertiary-bg rounded", curValue === "" ? "text-placeholder-color" : "")}
        >
            {curValue === "" ? placeholder : curValue.padStart(maxLength, "0")}
        </span>
    )
}
