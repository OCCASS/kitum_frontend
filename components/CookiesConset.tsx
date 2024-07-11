"use client"

import Link from "next/link"
import { useState } from "react"
import Button from "./ui/Button"

function loadState() {
    const data = localStorage.getItem("cookiesConset")
    if (!data) return false
    return data === "true"
}


export default function CookiesConset() {
    const [showConset, setShowConset] = useState<boolean>(() => !loadState())

    if (!showConset) return null

    const accept = () => {
        localStorage.setItem("cookiesConset", "true")
        setShowConset(false)
    }

    return (
        <div className="absolute bottom-0 inset-x-0 w-full z-[80] text-sm px-4 sm:px-6 py-3 shadow-top bg-white flex justify-between items-center flex-col md:flex-row gap-3">
            <p className="md:flex-1">
                Мы используем файлы cookie для работы сайта. Продолжая, вы соглашаетесь с нашей <Link href="#" className="text-blue">Политикой конфиденциальности</Link>
            </p>
            <Button className="w-full md:w-auto" onClick={accept}>Принять</Button>
        </div>
    )
}
