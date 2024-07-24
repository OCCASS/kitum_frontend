import { Suspense } from "react"
import Homework from "./components/Homework";
import HomeworkSkeleton from "./components/HomeworkSkeleton";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – домашнее задание"
}

export default async function Page() {
    return (
        <div className="space-y-3">
            <h1>Домашнее задание</h1>
            <Suspense fallback={<HomeworkSkeleton />}>
                <Homework />
            </Suspense>
        </div>
    )
}
