import {Suspense} from "react";
import Variant from "./components/Variant";
import VariantSkeleton from "./components/VariantSkeleton";

type TVariantProps = {
    params: { id: string }
}

export default async function Page({params}: TVariantProps) {
    return (
        <Suspense fallback={<VariantSkeleton/>}>
            <Variant id={params.id}/>
        </Suspense>
    )
}

