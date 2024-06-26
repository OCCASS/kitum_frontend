"use client"

import { useFormStatus } from "react-dom";
import Button, { TButtonProps } from "./Button";
import Spinner from "./Spinner";
import { twMerge } from "tailwind-merge";

export default function SubmitButton({ children, className, ...props }: TButtonProps) {
    const { pending } = useFormStatus()

    return <Button className={twMerge("relative", className)} type="submit" {...props}>
        <div className={pending ? "invisible" : "visible"}>{children}</div>
        <Spinner className={
            twMerge(
                "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                pending ? "block" : "hidden"
            )
        } />
    </Button>
}
