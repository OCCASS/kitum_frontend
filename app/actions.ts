"use server"

import { deleteSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function signout() {
    const access = cookies().get("access")?.value
    const refresh = cookies().get("refresh")?.value
    await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/signout`, {
        method: "POST",
        body: JSON.stringify({ access, refresh }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    await deleteSession()
    redirect("/signin")
}

export async function refresh() {
    const access = cookies().get("access")?.value
    const refresh = cookies().get("refresh")?.value
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ access, refresh }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json()
        return data
    }
    return null
}
