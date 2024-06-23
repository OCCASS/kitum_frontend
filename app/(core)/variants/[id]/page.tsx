import VariantView from "@/components/VariantView"
import { get } from "@/lib/fetch"
import IVariant from "@/types/variant"

type TVariantProps = {
    params: { id: string }
}

export default async function Variant({ params }: TVariantProps) {
    const { data: variant } = await get<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${params.id}/`)
    return <VariantView data={variant} />
}

