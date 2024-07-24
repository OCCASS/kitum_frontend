import SelectVariantSection from "./components/SelectVariantSection";
import GenerateVariantSection from "./components/GenerateVariantSection";
import History from "./components/History"
import {Suspense} from "react";
import LoadingView from "@/components/LoadingView";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – тренировка"
}

export default function Page() {
    return (
        <div className="space-y-3">
            <h1>Тренировка</h1>
            <div className="grid md:grid-cols-2 gap-3">
                <GenerateVariantSection/>
                <SelectVariantSection/>
            </div>
            <h1>История</h1>
            <Suspense fallback={<LoadingView/>}>
                <History/>
            </Suspense>
        </div>
    )
}
