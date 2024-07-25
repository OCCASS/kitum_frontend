import React, {Dispatch, SetStateAction, useEffect} from "react";
import Button from "@/components/ui/Button";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function Modal({
                                  title,
                                  show,
                                  setShow,
                                  closable = true,
                                  children
                              }: { title: string, show: boolean, setShow: Dispatch<SetStateAction<boolean>>, closable?: boolean, children: React.ReactNode }) {
    const close = () => {
        if (closable) setShow(false)
    }

    useEffect(() => {
        if (show) document.body.classList.add("overflow-hidden")
        else document.body.classList.remove("overflow-hidden")
    }, [show])

    return (
        <div className={`${show ? "visible opacity-100" : "invisible opacity-0"} transition-all overlay overflow-auto`}
             onClick={close}>
            <div className="popup">
                <div className="popup__header">
                    <div className="h-full flex justify-between items-center">
                        <h2>{title}</h2>
                        {closable && <Button variant="none" onClick={close}><XMarkIcon className="size-6"/></Button>}
                    </div>
                </div>
                <div className="overflow-y-scroll pb-5 px-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
