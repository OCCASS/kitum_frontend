"use server"

import Link from "next/link"

export default async function ConfirmMail({ searchParams }: { searchParams: { t: string } }) {
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

    if (response.status === 200) return <>
        <p>Адрес почты подтвержден!</p>
        <p>Для входа в аккаунт можете перейти на страницу <Link href="/signin">входа</Link></p>
    </>

    return <p>Токен не валидный или просрочен!</p>
}
