"use server"

import {get} from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonView from "@/components/LessonView";
import {Metadata} from "next";
import {notFound} from "next/navigation";

type TLessonProps = {
    params: { id: string }
}

export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const {data: lesson} = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    return {
        title: lesson.title
    }
}

export default async function Page({params}: TLessonProps) {
    const {data: lesson, status} = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)
    if (status !== 200) notFound()
    return <LessonView data={lesson}/>
}
