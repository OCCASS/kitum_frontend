import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton"

function SekeletonItem() {
    return (
        <article className="card animate-pulse space-y-3">
            <H1Skeleton className="w-60" />
            <ButtonSkeleton className="w-40" />
        </article>
    )
}

export default function VariantsFeedSkeleton() {
    return <div className="feed">
        <SekeletonItem />
        <SekeletonItem />
        <SekeletonItem />
    </div>
}
