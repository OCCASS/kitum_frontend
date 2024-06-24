import React, { FC } from "react"
import { twMerge } from "tailwind-merge"

type TButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "outline" | "gray" | "none",
}

const defaultClassName = "px-5 py-2 rounded disabled:bg-gray-400/50 disabled:text-gray-600 disabled:cursor-not-allowed"

const Button: FC<TButtonProps> = ({ className, disabled, variant = "primary", ...props }) => {
    const cn = () => {
        let variantStyles;
        if (variant === "primary")
            variantStyles = "bg-black text-white"
        else if (variant === "outline")
            variantStyles = "bg-transparent border border-gray-300 hover:bg-gray-100"
        else if (variant === "gray")
            variantStyles = "bg-gray-300"
        else if (variant === "none")
            variantStyles = "disabled:bg-transparent p-0"

        return twMerge(defaultClassName, variantStyles, className)
    }

    return (
        <button
            className={cn()}
            disabled={disabled}
            {...props}
        />
    )
}

export default Button;
