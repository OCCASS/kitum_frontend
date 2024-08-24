import HomeworkCardSkeleton from "@/components/HomeworkCard/Skeleton";

export default function Loading() {
    return <div className="flex gap-3 overflow-hidden">
        <HomeworkCardSkeleton className="min-w-96" />
        <HomeworkCardSkeleton className="min-w-96" />
        <HomeworkCardSkeleton className="min-w-96" />
    </div>
}
