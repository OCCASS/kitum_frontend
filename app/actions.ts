"use server"

import { deleteSession } from "@/lib/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signout() {
    const cookiesStore = await cookies()
    const access = cookiesStore.get("access")?.value
    const refresh = cookiesStore.get("refresh")?.value
    await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/signout`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access, refresh })
        }
    )
    await deleteSession()
    redirect("/signin")
}
