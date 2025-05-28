import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import React, { FC } from "react"

export type TButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "outline" | "gray" | "none",
    size?: "base" | "sm"
}

const defaultClassName = "px-5 py-2 rounded disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:cursor-not-allowed active:opacity-[0.85]"
const button = cva(defaultClassName, {
    variants: {
        variant: {
            primary: "bg-button-primary-bg text-button-primary-text",
            outline: "bg-transparent border border-primary-border-color hover:bg-button-outline-hover-bg",
            gray: "bg-button-gray-bg",
            none: "disabled:bg-transparent p-0"
        },
        size: {
            base: "text-base",
            sm: "text-sm"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "base"
    }
})

const Button: FC<TButtonProps> = ({ className, disabled, variant, size, ...props }) => {
    return (
        <button className={cn(button({ variant, size, className }))} disabled={disabled} {...props} />
    )
}

export default Button;
