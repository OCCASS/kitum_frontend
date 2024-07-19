"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ConfirmMail({ searchParams }: { searchParams: { t: string } }) {
    const [status, setStatus] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/confirm_mail/`,
                {
                    method: "POST",
                    body: JSON.stringify({ token: searchParams.t }),
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

    if (isLoading) return <p>Loading...</p>

    if (status === 200) return <>
        <p>Адрес почты подтвержден!</p>
        <p>Для входа в аккаунт можете перейти на страницу <Link href="/signin" className="text-blue">входа</Link></p>
    </>

    return <p>Токен не валидный или просрочен!</p>
}
