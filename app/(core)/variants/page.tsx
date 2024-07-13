import {Suspense} from "react"
import VariantsSkeleton from "./components/VariantsSkeleton";
import Variants from "./components/Variants";

export default async function Page() {
    return (
        <div className="space-y-3">
            <h1>Варианты</h1>
            <Suspense fallback={<VariantsSkeleton/>}>
                <Variants/>
            </Suspense>
        </div>
    )
}

