import HomeworkCardSkeleton from "../HomeworkCard/Skeleton";

export default function HomeworkSliderSkeleton() {
    return (
        <div className="flex gap-3 overflow-hidden">
            <HomeworkCardSkeleton />
            <HomeworkCardSkeleton />
            <HomeworkCardSkeleton />
        </div>
    )
}
