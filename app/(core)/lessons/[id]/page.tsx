import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonView from "@/components/LessonView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type TLessonProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { data: lesson } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)

    if (!lesson) notFound()

    return {
        title: lesson.title
    }
}

export default async function Page(props: TLessonProps) {
    const params = await props.params;
    const { data: lesson, status } = await get<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${params.id}/`)

    if (status !== 200) notFound()

    return <LessonView data={lesson} />
}
