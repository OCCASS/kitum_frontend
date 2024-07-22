import SelectVariantSection from "./components/SelectVariantSection";
import CreateVariantSection from "./components/CreateVariantSection";
import History from "./components/History"
import {Suspense} from "react";
import LoadingView from "@/components/LoadingView";


/*
 * TODO: add data loading
 * TODO: add history loading
 * TODO: handle variant start
*/

export default function Page() {
    return (
        <div className="space-y-3">
            <h1>Тренировка</h1>
            <div className="grid md:grid-cols-2 gap-3">
                <CreateVariantSection/>
                <SelectVariantSection/>
            </div>
            <h1>История</h1>
            <Suspense fallback={<LoadingView/>}>
                <History/>
            </Suspense>
        </div>
    )
}
