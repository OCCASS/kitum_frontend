"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonCard from "@/components/LessonCard";
import EmptyListPlug from "@/components/EmptyListPlug";


export default async function Lessons({ status, subscription }: { status: string, subscription: string }) {
    const querySearch = new URLSearchParams({ status, subscription }).toString()
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/?${querySearch}`)

    if (!lessons || lessons.length === 0) {
        return <EmptyListPlug text="Список уроков пуст" />
    }

    return (
        <div className="feed">
            {lessons.map(item => <LessonCard key={item.id} lesson={item} />)}
        </div>
    )
}
