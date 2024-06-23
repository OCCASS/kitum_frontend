"use server"

import { createSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function signup(prevState: any, formData: FormData) {
    const body = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        const { access, refresh } = await response.json()
        await createSession(access, refresh)
        redirect("/")
    }
    return { message: "Registration failed." }
}

