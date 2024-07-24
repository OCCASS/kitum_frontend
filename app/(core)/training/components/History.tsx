import {get} from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantCard from "@/components/VariantCard";
import EmptyListPlug from "@/components/EmptyListPlug";

export default async function History() {
    const {data: variants} = await get<IVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/?generated=true`)

    if (variants.length === 0) {
        return <EmptyListPlug text="У вас нет решеных вариантов" />
    }

    return <div className="feed">{variants.map(item => <VariantCard key={item.id} variant={item}/>)}</div>
}