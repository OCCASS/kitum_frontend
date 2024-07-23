"use server"

import {post} from "@/lib/fetch";
import {redirect} from "next/navigation";
import IVariant from "@/types/variant";

export async function generateVariant(prevState: any, formData: FormData) {
    const {data, status} = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/generate/`, {
        name: formData.get("name"),
        complexity: formData.get("complexity")
    })
    if (status === 200) redirect(`/variants/${data.id}/`)
    return {}
}