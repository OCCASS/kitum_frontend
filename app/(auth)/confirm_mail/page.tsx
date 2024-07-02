"use server"

import { RedirectType, redirect } from "next/navigation"

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

    if (response.status === 200) redirect("/signin", RedirectType.replace)

    return <p>Token is invalid or expired</p>
}
