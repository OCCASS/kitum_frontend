import FilterBar from "./components/FilterBar";
import Lessons from "./components/Lessons";
import LessonsSkeleton from "./components/LessonsSkeleton";
import { Suspense } from "react";

export default async function Page() {
    return (
        <div className="space-y-3">
            <h1>Уроки</h1>
            <FilterBar />
            <Suspense fallback={<LessonsSkeleton />}>
                <Lessons />
            </Suspense>
        </div>
    )
}
