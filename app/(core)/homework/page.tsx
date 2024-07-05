import HomeworksFeed from "@/components/HomeworksFeed"
import HomeworksFeedSkeleton from "@/components/HomeworksFeed/Skeleton"
import { Suspense } from "react"

export default async function HomeWork() {
    return (
        <div className="space-y-3">
            <h1>Домашняя работа</h1>
            <Suspense fallback={<HomeworksFeedSkeleton />}>
                <HomeworksFeed />
            </Suspense>
        </div>
    )
}
