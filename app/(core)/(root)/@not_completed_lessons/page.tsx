"use server"

import LessonCard from "@/components/LessonCard"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

export default async function Page() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/not_completed/`)
    return <div className="flex gap-3 overflow-auto">{
        lessons.length > 0 ?
            lessons.map(item => <LessonCard key={item.id} lesson={item} className="min-w-96" />) :
            <p className="text-gray-500">Список уроков пуст!</p>
    }</div>
} 
