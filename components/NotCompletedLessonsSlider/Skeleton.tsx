import LessonCardSkeleton from "../LessonCard/Skeleton";

export default function NotCompletedLessonsSliderSkeleton() {
    return (
        <div className="flex gap-3 overflow-hidden">
            <LessonCardSkeleton />
            <LessonCardSkeleton />
            <LessonCardSkeleton />
        </div>
    )
}
