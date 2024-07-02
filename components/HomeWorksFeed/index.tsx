"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import HomeworkItem from "./Item";

export default async function HomeworksFeed() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/`)
    return <div className="feed">{
        lessons.length > 0 ? lessons.map(item => <HomeworkItem key={item.id} lesson={item} />) :
            <p className="text-gray-500">Список домшней работы пуст!</p>
    }</div>
}
