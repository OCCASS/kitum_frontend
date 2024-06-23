import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { access, refresh } = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/logout/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    })
    return NextResponse.json({}, { status: response.status })
}
