import { Suspense } from "react"
import LessonTasks from "./components/LessonTasks";
import LessonTasksSkeleton from "./components/LessonTasksSkeleton";

type TLessonTaskProps = {
    params: { id: string }
}

export default async function Page({ params }: TLessonTaskProps) {
    return (
        <Suspense fallback={<LessonTasksSkeleton />}>
            <LessonTasks id={params.id} />
        </Suspense>
    )
}
