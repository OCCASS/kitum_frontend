import {ButtonSkeleton, H1Skeleton} from "@/components/Skeleton";

export default function VariantCardSkeleton() {
    return (
        <article className="card animate-pulse space-y-3">
            <H1Skeleton className="w-60"/>
            <ButtonSkeleton className="w-40"/>
        </article>
    )
}