import React, {FC} from "react"
import Spinner from "./Spinner"
import Button from "@/components/ui/Button";
import {twMerge} from "tailwind-merge";

export type TLoadingButtonProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & {
    variant?: "primary" | "outline" | "gray" | "none",
    isLoading: boolean
}

const LoadingButton: FC<TLoadingButtonProps> = ({className, isLoading, children, disabled, variant, onClick, ...props}) => {
    const onClickWrapper = (e: React.MouseEventHandler<HTMLButtonElement, MouseEvent>) => {
        if (disabled || isLoading) return
        if (onClick) onClick(e)
    }

    return (
        <Button className={twMerge("relative", className)} variant={variant} disabled={disabled} onClick={onClickWrapper} {...props}>
            <div className={isLoading ? "invisible" : "visible"}>{children}</div>
            {isLoading && <Spinner className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>}
        </Button>
    )
}

export default LoadingButton;
