import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import { Ref } from "react"

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    variant?: "primary" | "gray" | "none",
    innerRef?: Ref<HTMLInputElement>
}

const defaultClassName = "bg-secondary-bg  px-3 py-2 rounded outline-none disabled:cursor-not-allowed disabled:text-gray-600"
const input = cva(defaultClassName, {
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

const Input = ({ className, variant, innerRef, ...props }: TInputProps) => {
    return <input ref={innerRef} className={cn(input({ variant, className }))} {...props} />
}

export default Input;
