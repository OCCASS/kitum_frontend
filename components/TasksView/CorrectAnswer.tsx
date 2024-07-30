"use client"

import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import Button from "@/components/ui/Button";

export default function CorrectAnswer({answer}: { answer: string[] | null }) {
    const [show, setShow] = useState(false)

    return (
        <section>
            <Button
                className="flex items-center gap-1 font-semibold"
                onClick={() => setShow(prev => !prev)}
                variant="none"
            >
                Правильный ответ <ChevronRightIcon className={`size-5 ${show ? "rotate-90" : "rotate-0"} transition`}/>
            </Button>
            <div className={show ? "block" : "hidden"}>{answer}</div>
        </section>
    )
}