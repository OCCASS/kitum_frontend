import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import { Ref } from "react"

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    variant?: "primary" | "gray" | "none",
    type?: string,
    innerRef?: Ref<HTMLInputElement>
}

const defaultClassName = "bg-secondary-bg px-3 py-2 rounded outline-none disabled:cursor-not-allowed disabled:text-gray-600 placeholder-placeholder-color file:bg-gray-200 file:border-0 file:px-3 file:py-2 file:rounded file:rounded file:rounded-r-none file:mr-3"
const input = cva(defaultClassName, {
    variants: {
        variant: {
            primary: "border border-primary-border-color disabled:border-gray-400",
            gray: "border border-gray-400 disabled:border-gray-500",
            none: "p-0 bg-transparent"
        },
        inputType: {
            any: "",
            file: "p-0"
        }
    },
    defaultVariants: {
        variant: "primary",
        inputType: "any"
    }
})

const Input = ({ className, variant, type = "text", innerRef, ...props }: TInputProps) => {
    return <input ref={innerRef} className={cn(input({ variant, inputType: type === "file" ? "file" : "any", className }))} type={type} {...props} />
}

export default Input;
