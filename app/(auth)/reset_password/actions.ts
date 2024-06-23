import { redirect } from "next/navigation"

export default async function requesetResetPassword(prevState: any, formData: FormData) {
    const body = { email: formData.get("email") }
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/reset_password`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        redirect("/signin")
    }
    return { "message": "Reset password request failed." }
}
