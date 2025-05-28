"use server"

import { cookies } from "next/headers"
import { createSession } from "./session"
import { signout } from "@/app/actions"
import { refreshTokens } from "./auth";


async function $fetch(url: string | URL | Request, init?: RequestInit, afterRefresh = false): Promise<Response> {
    const cookiesStore = await cookies()
    const access = cookiesStore.get("access")?.value;
    const fingerprint = cookiesStore.get("fp")?.value;

    const headers = new Headers({
        ...(access ? { "Authorization": `Bearer ${access}`, "X-Fingerprint": fingerprint } : {}),
        ...(init?.headers instanceof Headers ? Object.fromEntries(init.headers.entries()) : init?.headers),
    });

    const response = await fetch(url, { ...init, headers });

    if (response.status === 401) {
        if (afterRefresh) {
            await signout();
            return response
        }

        const refreshToken = (await cookies()).get("refresh")?.value;
        if (!refreshToken) {
            await signout();
            return response
        }

        const tokens = await refreshTokens({ refresh: refreshToken, access });
        if (!tokens) {
            await signout();
            return response
        }

        await createSession(tokens.access, tokens.refresh);
        return await $fetch(url, init, true);
    }

    return response;
}

export async function get<T>(url: string) {
    const access = (await cookies()).get("access")?.value
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
        }
    }
    try {
        const response = await $fetch(url, requestOptions)
        const data: T = await response.json().catch(() => null) as T
        return { data, status: response.status }
    } catch {
        return { data: null, status: 500 }
    }
}

export async function post<T>(url: string, body?: any, ...params: any) {
    const access = (await cookies()).get("access")?.value
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        ...params
    }
    try {
        const response = await $fetch(url, requestOptions)
        const data: T = await response.json().catch(() => null) as T
        return { data, status: response.status }
    } catch {
        return { data: null, status: 500 }
    }
}

export async function postFormData<T>(url: string, body: FormData) {
    const access = (await cookies()).get("access")?.value
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${access}`
        },
        body: body
    }
    try {
        const response = await $fetch(url, requestOptions)
        const data: T = await response.json().catch(() => null) as T
        return { data, status: response.status }
    } catch {
        return { data: null, status: 500 }
    }
}
