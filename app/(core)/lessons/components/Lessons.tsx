"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonCard from "@/components/LessonCard";
import {getLessonsUrlParams} from "@/app/(core)/lessons/utils";


export default async function Lessons({status}: {status: string}) {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/?${getLessonsUrlParams(status)}`)

    if (lessons.length === 0) {
        return <p className="text-center text-gray-500">Список уроков пуст!</p>
    }

    return <div className="feed">{lessons.map(item => <LessonCard key={item.id} lesson={item} />)}</div>
}
