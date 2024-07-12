"use server"

import { createSession } from "@/lib/session"

export default async function signin(prevState: any, formData: FormData) {
    const body = { email: formData.get("email"), password: formData.get("password") }
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
        return { success: true, message: "", user: user }
    }
    return { success: false, message: "Login failed.", user: undefined }
}
