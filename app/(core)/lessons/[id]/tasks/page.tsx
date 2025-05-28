import LessonTasksView from "@/components/LessonTasksView";
import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type TLessonTaskProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)

    if (!lesson) return { title: "Не найдено" }

    return {
        title: `ДЗ – ${lesson.title}`
    }
}

export default async function Page(props: TLessonTaskProps) {
    const params = await props.params;
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)

    if (!lesson || !lesson.tasks) notFound()

    return <LessonTasksView data={lesson} />
}
