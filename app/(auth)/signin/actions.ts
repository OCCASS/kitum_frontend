"use server"

import { createSession } from "@/lib/session"
import { cookies } from "next/headers"

export default async function signin(prevState: any, formData: FormData, fingerprint: string, userAgent: string) {
    const body = { email: formData.get("email"), password: formData.get("password"), fingerprint, userAgent }
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        const { access, refresh, user } = await response.json()
        await createSession(access, refresh)
        const cookiesStore = await cookies()
        cookiesStore.set("fp", fingerprint)
        return { success: true, message: "", user: user }
    }
    return { success: false, message: "Неверная почта или пароль.", user: undefined }
}
