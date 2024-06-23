import LessonView from "@/components/LessonView"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

type TLessonProps = {
    params: { id: string }
}

export default async function Lesson({ params }: TLessonProps) {
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    return <LessonView data={lesson} />
}
