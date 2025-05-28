import { cookies } from "next/headers"
import { getTokenCookie } from "./session1";


export async function createSession(access: string, refresh: string) {
    try {
        const cookiesStore = await cookies();
        cookiesStore.set("access", access, await getTokenCookie(access))
        cookiesStore.set("refresh", refresh, await getTokenCookie(refresh))
    } catch (e) {
        return
    }
}

export async function deleteSession() {
    const cookiesStore = await cookies();
    cookiesStore.delete("access")
    cookiesStore.delete("refresh")
}
