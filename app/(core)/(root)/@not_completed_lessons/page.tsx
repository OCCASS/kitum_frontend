"use server"

import LessonCard from "@/components/LessonCard"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

export default async function Page() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/not_completed/`)

    if (!lessons || lessons.length === 0) return <p className="text-gray-500">Список уроков пуст!</p>

    return (
        <div className="flex gap-3 overflow-auto">
            {lessons.map(item => <LessonCard key={item.id} lesson={item} className="min-w-96" />)}
        </div>
    )
} 
