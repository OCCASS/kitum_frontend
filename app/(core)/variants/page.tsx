import {Suspense} from "react"
import VariantsSkeleton from "./components/VariantsSkeleton";
import Variants from "./components/Variants";
import FilterBar from "@/app/(core)/variants/components/FilterBar";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – варинаты"
}

export default function Page({searchParams}: { searchParams: { status: string, generated: string } }) {
    const {status, generated} = searchParams

    return (
        <div className="space-y-3">
            <h1>Варианты</h1>
            <FilterBar/>
            <Suspense fallback={<VariantsSkeleton/>}>
                <Variants status={status ?? "all"} generated={generated ?? "all"}/>
            </Suspense>
        </div>
    )
}

