import HomeWorksFeed from "@/components/HomeWorksFeed"
import HomeWorksFeedSkeleton from "@/components/HomeWorksFeed/HomeWorksFeedSkeleton"
import { Suspense } from "react"

export default async function HomeWork() {
    return (
        <div className="space-y-3">
            <h1>Домашняя работа</h1>
            <Suspense fallback={<HomeWorksFeedSkeleton />}>
                <HomeWorksFeed />
            </Suspense>
        </div>
    )
}

