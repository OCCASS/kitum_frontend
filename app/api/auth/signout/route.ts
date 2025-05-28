import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/logout/`, {
        method: "POST",
        body: JSON.stringify({ refresh: body.refresh }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${body.access}`
        },
        cache: "no-cache"
    })
    return NextResponse.json({}, { status: response.status })
}
