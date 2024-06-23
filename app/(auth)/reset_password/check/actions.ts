import { redirect } from "next/navigation"

export default async function resetPassword(prevState: any, formData: FormData) {
    const body = { newPassword: formData.get("new_password"), token: formData.get("token") }
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/reset_password/check`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        redirect("/signin")
    }
    return { message: "Reset password failed." }
}
