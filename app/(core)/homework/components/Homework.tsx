"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import HomeworkCard from "@/components/HomeworkCard";

export default async function Homework() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/`)

    if (lessons.length === 0) {
        return <p className="text-center text-gray-500">Список домашней работы пуст!</p>
    }

    return <div className="feed">{lessons.map(item => <HomeworkCard key={item.id} lesson={item} />)}</div>
}
