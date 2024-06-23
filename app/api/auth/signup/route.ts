import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/register/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
