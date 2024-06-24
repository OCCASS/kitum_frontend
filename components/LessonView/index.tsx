"use client"

import ILesson from "@/types/lesson";
import LessonViewFooter from "./Footer";
import { useState } from "react";
import { post } from "@/lib/fetch";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import MarkdownView from "../Markdown";

export default function LessonView({ data }: { data: ILesson }) {
    const [lesson, setLesson] = useState<ILesson>(data)

    async function complete() {
        const { data, status } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson.id}/complete/`)
        if (status === 200) setLesson(data)
    }

    async function skip() {
        const { data, status } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson.id}/skip/`)
        if (status === 200) setLesson(data)
    }

    return (
        <div className="space-y-2 max-w-prose m-auto">
            <Link href="/lessons" className="flex gap-2 items-center"><ArrowLeftIcon className="size-5" />Назад к урокам</Link>
            <h1>{lesson.title}</h1>
            <MarkdownView content={lesson.content} />
            <LessonViewFooter lesson={lesson} complete={complete} skip={skip} />
        </div>
    )
}
