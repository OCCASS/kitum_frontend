import CalendarSkeleton from "@/components/Calendar/Skeleton";

export default function Loading() {
    return (
        <div className="space-y-3">
            <h1>Расписание</h1>
            <CalendarSkeleton />
        </div>
    )

}
