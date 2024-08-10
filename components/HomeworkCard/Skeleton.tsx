import { ButtonSkeleton, H1Skeleton, PSkeleton } from "../Skeleton";
import {twMerge} from "tailwind-merge";

export default function HomeworkCardSkeleton({className}: {className?: string}) {
    return (
        <article className={twMerge("card space-y-3", className)}>
            <H1Skeleton className="w-60" />
            <PSkeleton />
            <ButtonSkeleton />
        </article>
    )
}
