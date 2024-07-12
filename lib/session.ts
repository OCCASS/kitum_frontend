import { decodeJwt } from "jose";
import { cookies } from "next/headers";

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
    } catch (error) {
        return null
    }
}

export async function createSession(access: string, refresh: string) {
    const decodedAccess = await decode(access)
    const decodedRefresh = await decode(refresh)
    if (!decodedAccess || !decodedRefresh) return // TODO: add expception
    cookies().set("access", access, { ...cookieConfig, expires: decodedAccess.exp * 1000 })
    cookies().set("refresh", refresh, { ...cookieConfig, expires: decodedRefresh.exp * 1000 })
}

function verifyToken(name: string): boolean {
    return cookies().has(name)
}

export function verifySession() {
    return {
        accessVerified: verifyToken("access"),
        refreshVerified: verifyToken("refresh"),
    }
}

export async function deleteSession() {
    cookies().delete("access")
    cookies().delete("refresh")
}
