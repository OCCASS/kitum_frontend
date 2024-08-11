import React, {Dispatch, SetStateAction, useEffect} from "react";
import Button from "@/components/ui/Button";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {twMerge} from "tailwind-merge";

export default function Modal({
                                  title,
                                  show,
                                  setShow,
                                  closable = true,
                                  className,
                                  children
                              }: {
    title: string,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    className?: string
    closable?: boolean,
    children: React.ReactNode
}) {
    const close = () => {
        if (closable) setShow(false)
    }

    useEffect(() => {
        if (show) document.body.classList.add("overflow-hidden")
        else document.body.classList.remove("overflow-hidden")
    }, [show])

    return (
        <div
            className={twMerge("transition-all overlay overflow-auto", show ? "visible opacity-100" : "invisible opacity-0")}
            onClick={close}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="h-full flex justify-between items-center">
                        <h2>{title}</h2>
                        {closable && <Button variant="none" onClick={close}><XMarkIcon className="size-6"/></Button>}
                    </div>
                </div>
                <div className={twMerge("overflow-y-scroll pb-5 px-6", className)}>
                    {children}
                </div>
            </div>
        </div>
    )
}
