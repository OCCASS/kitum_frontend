import { H1Skeleton, PSkeleton } from "../Skeleton"

function SkeletonItem() {
    return (
        <article className="card space-y-3">
            <H1Skeleton className="w-60" />
            <PSkeleton />
        </article>
    )
}

export default function SubscriptionsFeedSkeleton() {
    return <div className="feed">
        <SkeletonItem />
        <SkeletonItem />
    </div>
}
