"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import HomeworkCard from "@/components/HomeworkCard";
import EmptyListPlug from "@/components/EmptyListPlug";

export default async function Homework() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/`)

    if (lessons.length === 0) {
        return <EmptyListPlug text="Список домашнего задания пуст" />
    }

    return <div className="feed">{lessons.map(item => <HomeworkCard key={item.id} lesson={item} />)}</div>
}
