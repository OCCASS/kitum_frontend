"use client"

import { useFormStatus } from "react-dom";
import Button from "./Button";
import Spinner from "./Spinner";
import { twMerge } from "tailwind-merge";

export default function SubmitButton({ children, className }: { children: React.ReactNode, className?: string }) {
    const { pending } = useFormStatus()

    return <Button className={twMerge("relative", className)} type="submit">
        <div className={pending ? "invisible" : "visible"}>{children}</div>
        <Spinner className={
            twMerge(
                "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                pending ? "block" : "hidden"
            )
        } />
    </Button>
}
