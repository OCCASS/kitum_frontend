"use server"

import VariantView from "@/components/VariantView"
import {get} from "@/lib/fetch"
import IVariant from "@/types/variant"

export default async function Variant({id}: { id: string }) {
    const {data: variant} = await get<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${id}/`)
    return <VariantView data={variant}/>
}

