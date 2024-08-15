"use server"

import VariantView from "@/components/VariantView"
import { get } from "@/lib/fetch"
import IUserVariant from "@/types/user_variant"
import {Metadata} from "next";
import {notFound} from "next/navigation";

type TVariantProps = {
    params: { id: string }
}

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const { data: variant } = await get<IUserVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/my/${params.id}/`)
    return {
        title: variant.title
    }
}

export default async function Page({ params }: TVariantProps) {
    const { data: variant , status} = await get<IUserVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/my/${params.id}/`)
    if (status !== 200) notFound()
    return <VariantView data={variant} />
}
