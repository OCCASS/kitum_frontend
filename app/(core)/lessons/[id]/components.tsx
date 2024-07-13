"use server"

import {get} from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonView from "@/components/LessonView";

export default async function Lesson({id}: {id: string}) {
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${id}/`)
    return <LessonView data={lesson} />
}