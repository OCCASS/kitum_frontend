"use server"

import {get} from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantCard from "@/components/VariantCard";
import {getVariantsUrlParams} from "@/app/(core)/variants/utils";

export default async function Variants({status, generated}: { status: string, generated: string }) {
    const {data: variants} = await get<IVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/?${getVariantsUrlParams(status, generated)}`)

    if (variants.length === 0)
        return <p className="text-center text-gray-500">Список вариантов пуст!</p>

    return <div className="feed">{variants.map(item => <VariantCard key={item.id} variant={item}/>)}</div>

}
