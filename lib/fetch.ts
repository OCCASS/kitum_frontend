"use server"

import { cookies } from "next/headers"

export async function get<T>(url: string) {
    const access = cookies().get("access")?.value
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`
        }
    }
    const response = await fetch(url, requestOptions)
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
    const response = await fetch(url, requestOptions)
    const data: T = await response.json()
    return { data, status: response.status }
}
