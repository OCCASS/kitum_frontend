"use server"

import LessonTasksView from "@/components/LessonTasksView";
import {get} from "@/lib/fetch";
import ILesson from "@/types/lesson";
import {Metadata} from "next";
import {notFound} from "next/navigation";

type TLessonTaskProps = {
    params: { id: string }
}

export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const {data: lesson} = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    return {
        title: `ДЗ – ${lesson.title}`
    }
}

export default async function Page({params}: TLessonTaskProps) {
    const {data: lesson} = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    if (!lesson.tasks) notFound()
    return <LessonTasksView data={lesson}/>
}
