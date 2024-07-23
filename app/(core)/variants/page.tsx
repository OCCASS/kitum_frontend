import {Suspense} from "react"
import VariantsSkeleton from "./components/VariantsSkeleton";
import Variants from "./components/Variants";
import FilterBar from "@/app/(core)/variants/components/FilterBar";

export default function Page({searchParams}: { searchParams: { status: string, generated: string } }) {
    return (
        <div className="space-y-3">
            <h1>Варианты</h1>
            <FilterBar/>
            <Suspense fallback={<VariantsSkeleton/>}>
                <Variants status={searchParams?.status ?? "all"} generated={searchParams?.generated ?? "all"}/>
            </Suspense>
        </div>
    )
}

