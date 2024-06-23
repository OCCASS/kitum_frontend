import VariantsFeed from "@/components/VariantsFeed"
import VariantsFeedSkeleton from "@/components/VariantsFeed/VariantsFeedSkeleton"
import { Suspense } from "react"

export default async function Variants() {
    return (
        <div className="space-y-3">
            <h1>Варианты</h1>
            <Suspense fallback={<VariantsFeedSkeleton />}>
                <VariantsFeed />
            </Suspense>
        </div>
    )
}

