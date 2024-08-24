import LessonCardSkeleton from "@/components/LessonCard/Skeleton";

export default function Loading() {
    return (
        <div className="flex gap-3 overflow-hidden">
            <LessonCardSkeleton className="min-w-96" />
            <LessonCardSkeleton className="min-w-96" />
            <LessonCardSkeleton className="min-w-96" />
        </div>
    )
}
