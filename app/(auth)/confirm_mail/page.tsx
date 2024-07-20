"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import LoadingView from "@/components/LoadingView"

export default function ConfirmMail() {
    const [status, setStatus] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/confirm_mail/`,
                {
                    method: "POST",
                    body: JSON.stringify({ token: searchParams.get("t") }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    cache: "no-cache"
                }
            )
            setIsLoading(false)
            setStatus(response.status)
        }

        fetchData()
    }, [])

    if (isLoading) return <LoadingView />

    if (status === 200) return (
        <div className="space-y-2">
            <h2 className="text-center">Адрес почты подтвержден!</h2>
            <p className="text-center">Для входа в аккаунт можете перейти на страницу <Link href="/signin" className="text-blue">входа</Link></p>
        </div>
    )

    return <p className="text-center text-gray-500">Токен не валидный или просрочен!</p>
}
