import HomeworksFeed from "@/components/HomeworksFeed"
import HomeworkFeedSkeleton from "@/components/HomeworksFeed/HomeworkFeedSkeleton"
import { Suspense } from "react"

export default async function HomeWork() {
    return (
        <div className="space-y-3">
            <h1>Домашняя работа</h1>
            <Suspense fallback={<HomeworkFeedSkeleton />}>
                <HomeworksFeed />
            </Suspense>
        </div>
    )
}

