"use server"

import {post} from "@/lib/fetch";
import {redirect} from "next/navigation";
import IUserVariant from "@/types/user_variant";
import IUser from "@/types/user";

export async function generateVariant(prevState: any, formData: FormData) {
    const {data, status} = await post<IUserVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/generate/`, {
        name: formData.get("name"),
        complexity: formData.get("complexity")
    })
    if (status === 200) redirect(`/variants/${data.id}/`)
    return {}
}

export async function startVariant(prevState: any, formData: FormData) {
    const variantId = formData.get("variant")
    const {data, status} = await post<IUserVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variantId}/start/`)
    if (status === 200) redirect(`/variants/${data.id}/`)
    return {}
}