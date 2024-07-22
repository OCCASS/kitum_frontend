"use server"

import {get} from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantCard from "@/components/VariantCard";

export default async function Variants({generated, status}: { generated: string, status: string }) {
    const getUrl = () => {
        let url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/`)
        if (status !== "all") url.searchParams.append("status", status)
        if (generated !== "all") url.searchParams.append("generated", generated)
        return url.toString()
    }

    const {data: variants} = await get<IVariant[]>(getUrl())

    if (variants.length === 0)
        return <p className="text-center text-gray-500">Список вариантов пуст!</p>

    return <div className="feed">{variants.map(item => <VariantCard key={item.id} variant={item}/>)}</div>

}
