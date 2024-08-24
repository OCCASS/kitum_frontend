"use server"

import HomeworkCard from "@/components/HomeworkCard"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

export default async function Page() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/not_completed/`)
    return <div className="flex gap-3 overflow-auto">{
        lessons.length > 0 ? lessons.map(item => <HomeworkCard key={item.id} lesson={item} className="min-w-96" />) :
            <p className="text-gray-500">Список домшней работы пуст!</p>
    }</div>
} 
