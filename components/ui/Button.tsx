import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import React, { FC } from "react"

export type TButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "outline" | "gray" | "none",
}

const defaultClassName = "px-5 py-2 rounded disabled:bg-gray-400/50 disabled:text-gray-600 disabled:cursor-not-allowed"
const button = cva(defaultClassName, {
    variants: {
        variant: {
            primary: "bg-black text-white",
            outline: "bg-transparent border border-gray-300 hover:bg-gray-100",
            gray: "bg-gray-300",
            none: "disabled:bg-transparent p-0"
        },
    },
    defaultVariants: {
        variant: "primary"
    }
})

const Button: FC<TButtonProps> = ({ className, disabled, variant, ...props }) => {
    return (
        <button className={cn(button({ variant, className }))} disabled={disabled} {...props} />
    )
}

export default Button;
