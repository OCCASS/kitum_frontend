import { twMerge } from "tailwind-merge"

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    variant?: "primary" | "none"
}

const defaultClassName = "px-3 py-2 rounded outline-none disabled:cursor-not-allowed disabled:text-gray-600"

const Input = ({ className, variant = "primary", ...props }: TInputProps) => {
    let additionalClassName = ""
    if (variant === "primary")
        additionalClassName = "border border-black disabled:border-gray-400 "
    else if (variant === "none")
        additionalClassName = "p-0 bg-transparent"


    return <input className={twMerge(defaultClassName, additionalClassName, className)} {...props} />
}

export default Input;
