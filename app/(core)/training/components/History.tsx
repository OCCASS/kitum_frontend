import {get} from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantCard from "@/components/VariantCard";

export default async function History() {
    const {data: variants} = await get<IVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/generated/`)

    if (variants.length === 0) {
        return <p className="text-center text-gray-500">Список вариантов пуст!</p>
    }

    return <div className="feed">{variants.map(item => <VariantCard key={item.id} variant={item}/>)}</div>
}