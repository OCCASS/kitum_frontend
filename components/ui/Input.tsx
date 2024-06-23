import { twMerge } from "tailwind-merge"

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const defaultClassName = "px-3 py-2 border border-black rounded outline-none disabled:border-gray-400 disabled:cursor-not-allowed disabled:text-gray-600"

const Input = ({ className, ...props }: TInputProps) => {
    return <input className={twMerge(defaultClassName, className)} {...props} />
}

export default Input;
