import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton";

export default function HomeworkCardSkeleton() {
    return (
        <article className="card space-y-3">
            <H1Skeleton className="w-60" />
            <PSkeleton />
            <ButtonSkeleton />
        </article>
    )
}
