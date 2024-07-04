import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton";

export default function LessonCardSkeleton() {
    return (
        <article className="card space-y-3">
            <H1Skeleton className="w-60" />
            <ButtonSkeleton />
            <PSkeleton />
        </article>
    )
}
