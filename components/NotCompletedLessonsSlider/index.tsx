"use server"

import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonCard from "../LessonCard";

export default async function NotCompletedLessonsSlider() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/not_completed/`)
    return <div className="flex gap-3 overflow-auto">{lessons.map(item => <LessonCard key={item.id} lesson={item} />)}</div>
}
