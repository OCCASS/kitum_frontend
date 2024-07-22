import cn from "@/utils/cn"
import { cva } from "class-variance-authority"

export type TSelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

const select = cva("select", {
    variants: {
        disabled: {
            true: "text-gray-500 cursor-not-allowed",
            false: null
        }
    }
})

export default function Select({ disabled, className, ...props }: TSelectProps) {
    return <select className={cn(select({ disabled, className }))} disabled={disabled} {...props} />
}
