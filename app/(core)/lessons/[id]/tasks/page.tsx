import LessonTasksView from "@/components/LessonTasksView"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

type TLessonTaskProps = {
    params: { id: string }
}

export default async function LessonTask({ params }: TLessonTaskProps) {
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    return <LessonTasksView data={lesson} />
}
