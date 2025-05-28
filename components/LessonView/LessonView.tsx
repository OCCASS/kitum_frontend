"use client"

import ILesson from "@/types/lesson";
import LessonViewFooter from "./Footer";
import { useState } from "react";
import { post } from "@/lib/fetch";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { MarkdownViewSkeleton } from "@/components/Markdown";
import Player from "@/components/Player";
import { formattedDate } from "@/utils/date";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/lib/providers/user";


const DynamicMarkdownView = dynamic(() => import("@/components/Markdown"), {
    ssr: false, loading: () => <MarkdownViewSkeleton />
})

export default function LessonView({ data }: { data: ILesson }) {
    const { user } = useUser()
    const [lesson, setLesson] = useState<ILesson>(data)

    async function complete() {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson.id}/complete/`)
        if (data && status === 200) setLesson(data)
    }

    const getAuthorName = () => {
        if (!lesson.author) return "Неизвестный спикер";

        return `${lesson.author.firstName} ${lesson.author.lastName}`
    }

    return (
        <div className="space-y-2 max-w-prose m-auto">
            <Link href="/lessons" className="flex gap-2 items-center"><ArrowLeftIcon className="size-5" />Назад к урокам</Link>
            <h1>{lesson.title}</h1>
            <Player title={lesson.title} subtitle={lesson.subscription.title} videoId={lesson.kinescopeVideoId} watermark={user?.email ?? ""} />
            <div className="text-gray-text border-b border-b-1 py-1  flex justify-between">
                <p className="flex items-center gap-2">
                    <UserIcon className="size-5" /> {getAuthorName()}
                </p>
                <p className="flex items-center gap-2">
                    <CalendarIcon className="size-5" /> {formattedDate(new Date(lesson.createdAt))}
                </p>
            </div>
            <DynamicMarkdownView content={lesson.content} />
            <LessonViewFooter lesson={lesson} complete={complete} />
        </div>
    )
}
