"use server"

import HomeworkCard from "@/components/HomeworkCard"
import { get } from "@/lib/fetch"
import ILesson from "@/types/lesson"

export default async function Page() {
    const { data: lessons, ok } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/not_completed/`)

    if (!ok || !lessons || lessons.length === 0) return <p className="text-gray-500">Список домшней работы пуст!</p>

    return (
        <div className="flex gap-3 overflow-auto">
            {lessons.map(item => <HomeworkCard key={item.id} lesson={item} className="min-w-96" />)}
        </div>
    )
} 
