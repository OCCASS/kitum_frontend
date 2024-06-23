import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton"

function SekeletonItem() {
    return (
        <article className="card space-y-3">
            <H1Skeleton className="w-60" />
            <PSkeleton />
            <ButtonSkeleton />
        </article>
    )
}

export default function HomeWorksFeedSkeleton() {
    return <div className="feed">
        <SekeletonItem />
        <SekeletonItem />
        <SekeletonItem />
    </div>
}
