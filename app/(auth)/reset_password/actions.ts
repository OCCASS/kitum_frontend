export default async function requestResetPassword(prevState: any, formData: FormData) {
    const body = {email: formData.get("email")}
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/reset_password`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        return {status: true}
    }
    return {status: false}
}
