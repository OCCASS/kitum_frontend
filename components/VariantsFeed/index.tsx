import { get } from "@/lib/fetch";
import IVariant from "@/types/variant";
import VariantItem from "./VariantItem";

export default async function VariantsFeed() {
    const { data: variants } = await get<IVariant[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/`)
    return <div className="feed">{variants.map(item => <VariantItem key={item.id} variant={item} />)}</div>

}
