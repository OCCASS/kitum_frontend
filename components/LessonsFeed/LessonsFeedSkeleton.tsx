import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton"

function SkeletonItem() {
    return (
        <article className="card space-y-3">
            <H1Skeleton className="w-60" />
            <ButtonSkeleton />
            <PSkeleton />
        </article>
    )
}

export default function LessonsFeedSkeleton() {
    return <div className="feed">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
    </div>
}
