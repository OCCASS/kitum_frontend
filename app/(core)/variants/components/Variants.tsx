"use server"

import {get} from "@/lib/fetch";
import IUserVariant from "@/types/user_variant";
import VariantCard from "@/components/VariantCard";
import {getVariantsUrlParams} from "@/app/(core)/variants/utils";
import EmptyListPlug from "@/components/EmptyListPlug";

export default async function Variants({status, generated}: { status: string, generated: string }) {
    const {data: variants} = await get<IUserVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/my/?${getVariantsUrlParams(status, generated)}`)

    if (variants.length === 0)
        return <EmptyListPlug text="Список вариантов пуст" />

    return <div className="feed">{variants.map(item => <VariantCard key={item.id} variant={item}/>)}</div>

}
