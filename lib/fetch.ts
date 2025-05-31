"use server"

import { cookies } from "next/headers"
import { createSession } from "./session"
import { signout } from "@/app/actions"
import { refreshTokens } from "./auth";

let refreshPromise: Promise<void> | null = null;

async function $fetch(url: string | URL | Request, init?: RequestInit, afterRefresh = false): Promise<Response> {
    const cookiesStore = await cookies();
    const access = cookiesStore.get("access")?.value;
    const fingerprint = cookiesStore.get("fp")?.value;

    const headers = new Headers({
        ...(access ? { "Authorization": `Bearer ${access}`, "X-Fingerprint": fingerprint } : {}),
        ...(init?.headers instanceof Headers ? Object.fromEntries(init.headers.entries()) : init?.headers),
    });

    let response = await fetch(url, { ...init, headers });

    if (response.status === 401) {
        if (afterRefresh) {
            await signout();
            return response;
        }

        if (refreshPromise) {
            await refreshPromise;
        } else {
            const refresh = (await cookies()).get("refresh")?.value;
            if (!refresh) {
                await signout();
                return response;
            }

            refreshPromise = (async () => {
                const tokens = await refreshTokens({ refresh, access });
                if (!tokens) {
                    await signout();
                    return;
                }
                await createSession(tokens.access, tokens.refresh);
            })();

            try {
                await refreshPromise;
            } finally {
                // Убираем блокировку
                refreshPromise = null;
            }
        }

        // Повторяем исходный запрос после обновления токена
        return await $fetch(url, init, true);
    }

    return response;
}

export async function get<T>(url: string) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {
        const response = await $fetch(url, requestOptions);
        const data: T = await response.json().catch(() => null) as T;
        return { data, status: response.status, ok: response.ok };
    } catch {
        return { data: null, status: 500 };
    }
}

export async function post<T>(url: string, body?: any, ...params: any) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        ...params
    };
    try {
        const response = await $fetch(url, requestOptions);
        const data: T = await response.json().catch(() => null) as T;
        return { data, status: response.status, ok: response.ok };
    } catch {
        return { data: null, status: 500 };
    }
}

export async function postFormData<T>(url: string, body: FormData) {
    const requestOptions = {
        method: "POST",
        body: body
    };
    try {
        const response = await $fetch(url, requestOptions);
        const data: T = await response.json().catch(() => null) as T;
        return { data, status: response.status, ok: response.ok };
    } catch {
        return { data: null, status: 500 };
    }
}
