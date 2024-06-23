import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/reset_password/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return NextResponse.json({}, { status: response.status })
}
