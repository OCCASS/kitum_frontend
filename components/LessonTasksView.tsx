"use client"

import { post, postFormData } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import { useState } from "react";
import TasksView from "@/components/TasksView";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TTaskAnswer } from "@/types/task";


export default function LessonTasksView({ data }: { data: ILesson }) {
    const [lesson, setLesson] = useState<ILesson>(data)

    const complete = async () => {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/complete_tasks/`)

        if (data && status === 200) setLesson(data)
    }

    const skip = async (taskId: string) => {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/${taskId}/skip/`)
        if (data && status === 200) setLesson(data)
    }

    const answer = async (taskId: string, answer: TTaskAnswer) => {
        if (Array.isArray(answer) && (answer.length === 0 || answer.includes(""))) return


        let response;
        const formData = new FormData()
        if (typeof answer === "string") {
            formData.append("answer", JSON.stringify(answer))
            response = await postFormData<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/${taskId}/answer/`, formData)
        } else if (answer) {
            const formData = new FormData()
            formData.append("answer_file", answer)
            response = await postFormData<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/${taskId}/answer/`, formData)
        } else {
            console.error("Answer failed")
            return
        }

        if (response.data && response.status === 200) {
            setLesson(response.data)
        } else {
            console.error("Answer failed", response.data)
        }
    }

    return (
        <div className="space-y-2 max-w-prose m-auto">
            <Link href={`/lessons/${lesson.id}`} className="flex gap-2 items-center"><ArrowLeftIcon className="size-5" />Назад
                к уроку</Link>
            {/* Header */}
            <div className="flex justify-between md:items-center flex-col md:flex-row gap-3 md:gap-0">
                <h1>Домашнее задание</h1>
                {lesson.status !== "tasks_completed" &&
                    <Button onClick={complete} variant="outline" className="md:text-sm">Завершить</Button>}
            </div>
            {/* Content */}
            <TasksView
                tasks={lesson?.tasks ?? []}
                disabled={lesson.status === "tasks_completed"}
                answerTask={answer}
                skipTask={skip}
                showAnswer={lesson.status === "tasks_completed"}
            />
        </div>
    )
}
