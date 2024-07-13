"use server"

import LessonTasksView from "@/components/LessonTasksView";
import {get} from "@/lib/fetch";
import ILesson from "@/types/lesson";

export default async function LessonTasks({id}: {id: string}) {
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${id}/`)
    return <LessonTasksView data={lesson} />
}
