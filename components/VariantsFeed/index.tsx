"use server"

import { get } from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantsFeedItem from "./Item";

export default async function VariantsFeed() {
    const { data: variants } = await get<IVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/`)
    return <div className="feed">{
        variants.length > 0 ? variants.map(item => <VariantsFeedItem key={item.id} variant={item} />) :
            <p className="text-gray-500">Список вариантов пуст!</p>
    }</div>

}
