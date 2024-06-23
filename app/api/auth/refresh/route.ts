import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { access, refresh } = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
