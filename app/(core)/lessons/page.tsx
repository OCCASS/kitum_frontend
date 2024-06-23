import LessonsFeed from "@/components/LessonsFeed";
import LessonsFeedSkeleton from "@/components/LessonsFeed/LessonsFeedSkeleton";
import { Suspense } from "react";

export default async function Lessons() {
    return (
        <div className="space-y-3">
            <h1>Уроки</h1>
            <Suspense fallback={<LessonsFeedSkeleton />}>
                <LessonsFeed />
            </Suspense>
        </div>
    )
}
