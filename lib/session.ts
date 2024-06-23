import { decodeJwt } from "jose";
import { cookies } from "next/headers";

const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/"
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
    cookies().set("access", access, cookieConfig)
    cookies().set("refresh", refresh, cookieConfig)
}

async function verifyToken(name: string): Promise<boolean> {
    const cookie = cookies().get(name)?.value
    if (!cookie) return false
    const decodedCookie = await decode(cookie)
    if (!decodedCookie) return false
    return decodedCookie.exp * 1000 > Date.now()
}

export async function verifySession() {
    return {
        accessVerified: await verifyToken("access"),
        refreshVerified: await verifyToken("refresh"),
    }
}

export async function deleteSession() {
    cookies().delete("access")
    cookies().delete("refresh")
}
