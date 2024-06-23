import Link, { LinkProps } from "next/link"
import { twMerge } from "tailwind-merge"

type TLinkButtonProps = LinkProps & {
    variant?: "primary" | "outline",
    className?: string,
    children: React.ReactNode
}

export default function LinkButton({ children, className = "", variant = "primary", ...props }: TLinkButtonProps) {
    const cn = () => {
        let variantStyles;
        if (variant === "primary")
            variantStyles = "bg-black text-white"
        else
            variantStyles = "bg-transparent border border-gray-300"

        return twMerge("px-5 py-2 rounded inline-block", variantStyles, className)
    }

    return (
        <Link
            className={cn()}
            {...props}
            type="button"
        >{children}</Link>
    )
}
