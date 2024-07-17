"use server"

import { cookies } from "next/headers"
import { createSession, deleteSession } from "./session"
import { refresh } from "@/app/actions"


async function signout() {
    await deleteSession()
}


async function interceptor(r: Response) {
    if (r.status === 401) {
        await signout()
        return r
    }
    else if (r.status === 403) {
        const tokens = await refresh()
        if (!tokens) await signout()
        await createSession(tokens.access, tokens.refresh)
        return r
    }
    return r
}

export async function get<T>(url: string) {
    const access = cookies().get("access")?.value
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`
        }
    }
    const response = await interceptor(await fetch(url, requestOptions))
    const data: T = await response.json()
    return { data, status: response.status }
}

export async function post<T>(url: string, body?: any, ...params: any) {
    const access = cookies().get("access")?.value
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        ...params
    }
    const response = await interceptor(await fetch(url, requestOptions))
    const data: T = await response.json()
    return { data, status: response.status }
}

export async function postFormData<T>(url: string, body: FormData) {
    const access = cookies().get("access")?.value
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${access}`,
        },
        body: body
    }
    const response = await interceptor(await fetch(url, requestOptions))
    const data: T = await response.json()
    return { data, status: response.status }
}
