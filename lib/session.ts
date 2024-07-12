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

export async function getTokenCookie(token: string) {
    const decodedToken = await decode(token)
    if (!decodedToken) throw "token is invalid"
    return { ...cookieConfig, expires: decodedToken.exp * 1000 }
}

export async function createSession(access: string, refresh: string) {
    try {
        cookies().set("access", access, await getTokenCookie(access))
        cookies().set("refresh", refresh, await getTokenCookie(refresh))
    } catch {
        return
    }
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
