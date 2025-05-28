import LessonsSkeleton from "./components/LessonsSkeleton";

export default function Loading() {
    return (
        <div className="space-y-3">
            <h1>Уроки</h1>
            <LessonsSkeleton />
        </div>
    )
}
