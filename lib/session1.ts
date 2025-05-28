import { decodeJwt } from "jose"
import { NextRequest } from "next/server"

const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
}

type DecodedCookie = {
    exp: number
}

export async function decode(token: string) {
    try {
        return decodeJwt(token) as DecodedCookie
    } catch {
        return null
    }
}

export async function getTokenExpiresAt(token: string) {
    const decodedToken = await decode(token)
    if (!decodedToken) throw new Error("Invalid token")
    return new Date(decodedToken.exp * 1000)
}

export async function getTokenCookie(token: string) {
    return {
        ...cookieConfig,
        expires: await getTokenExpiresAt(token)
    }
}

export async function verifySessionFromRequest(req: NextRequest) {
    const access = req.cookies.get("access")?.value
    const refresh = req.cookies.get("refresh")?.value
    return {
        accessVerified: Boolean(access),
        refreshVerified: Boolean(refresh),
    }
}
