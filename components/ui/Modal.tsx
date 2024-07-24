import React, { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({
    title,
    show,
    setShow,
    children
}: { title: string, show: boolean, setShow: Dispatch<SetStateAction<boolean>>, children: React.ReactNode }) {
    return (
        <div className={`${show ? "visible opacity-100" : "invisible opacity-0"} transition-all overlay overflow-auto`}
            onClick={() => setShow(false)}>
            <div className={`popup bg-secondary-bg space-y-5`}>
                <div className="flex items-center justify-between">
                    <h2>{title}</h2>
                    <Button variant="none" onClick={() => setShow(false)}><XMarkIcon className="size-6" /></Button>
                </div>
                {children}
            </div>
        </div>
    )
}
