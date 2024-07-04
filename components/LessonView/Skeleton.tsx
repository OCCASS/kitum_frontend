import {H1Skeleton, PSkeleton} from "@/components/Skeleton";

export default function LessonViewSkeleton() {
    return (
        <div className="space-y-3 max-w-prose m-auto">
            <H1Skeleton className="w-60"/>
            <PSkeleton className="w-80" />
            <PSkeleton className="w-60"/>
            <PSkeleton className="w-[400px]"/>
            <PSkeleton className="w-[360px]" />
        </div>
    )
}
