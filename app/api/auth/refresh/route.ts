import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const refresh = body.refresh ?? (await cookies()).get("refresh")?.value
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
