import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { email, password, fingerprint, userAgent } = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/login/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "X-Fingerprint": fingerprint,
            "User-Agent": userAgent,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
