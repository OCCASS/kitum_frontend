import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"

type TLinkButtonProps = LinkProps & {
    variant?: "primary" | "outline",
    className?: string,
    children: React.ReactNode
}

const linkButton = cva("px-5 py-2 rounded inline-block cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-button-primary-bg text-button-primary-text",
            outline: "bg-transparent border border-primary-border-color hover:bg-button-outline-hover-bg"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
})

export default function LinkButton({ children, className, variant, ...props }: TLinkButtonProps) {
    return <Link className={cn(linkButton({ className, variant }))} {...props} type="button">{children}</Link>
}
