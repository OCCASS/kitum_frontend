import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import React, { FC } from "react"
import Spinner from "./Spinner"
import { twMerge } from "tailwind-merge"

export type TLoadingButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "outline" | "gray" | "none",
    isLoading: boolean
}

const defaultClassName = "relative px-5 py-2 rounded disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:cursor-not-allowed"
const button = cva(defaultClassName, {
    variants: {
        variant: {
            primary: "bg-button-primary-bg text-button-primary-text",
            outline: "bg-transparent border border-primary-border-color hover:bg-button-outline-hover-bg",
            gray: "bg-button-gray-bg",
            none: "disabled:bg-transparent p-0"
        },
    },
    defaultVariants: {
        variant: "primary"
    }
})

const LoadingButton: FC<TLoadingButtonProps> = ({ className, isLoading, children, disabled, variant, ...props }) => {
    return (
        <button className={cn(button({ variant, className }))} disabled={disabled} {...props}>
            <div className={isLoading ? "invisible" : "visible"}>{children}</div>
            <Spinner className={
                twMerge(
                    "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    isLoading ? "block" : "hidden"
                )
            } />
        </button>
    )
}

export default LoadingButton;
