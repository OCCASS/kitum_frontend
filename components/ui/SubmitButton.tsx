"use client"

import { useFormStatus } from "react-dom";
import Button from "./Button";
import Spinner from "./Spinner";

export default function SubmitButton({ children, className }: { children: React.ReactNode, className?: string }) {
    const { pending } = useFormStatus()

    return <Button className={className} type="submit">{pending ? <Spinner className="m-auto" /> : children}</Button>
}
