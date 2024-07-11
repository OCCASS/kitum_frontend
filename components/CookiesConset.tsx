"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "./ui/Button"


export default function CookiesConset() {
    const [showConset, setShowConset] = useState<boolean>(true)

    useEffect(() => {
        setShowConset(localStorage.getItem("cookiesConset") !== "true")
    }, [])

    const accept = () => {
        localStorage.setItem("cookiesConset", "true")
        setShowConset(false)
    }

    if (!showConset) return null

    return (
        <section className="fixed bottom-0 inset-x-0 w-full z-[80] text-sm px-4 sm:px-6 py-3 shadow-top bg-white flex justify-between items-center flex-col md:flex-row gap-3">
            <p className="md:flex-1">
                Мы используем файлы cookie для работы сайта. Продолжая, вы соглашаетесь с нашей <Link href="#" className="text-blue">Политикой конфиденциальности</Link>
            </p>
            <Button className="w-full md:w-auto" onClick={accept}>Принять</Button>
        </section>
    )
}
