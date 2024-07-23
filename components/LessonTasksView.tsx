"use client"

import { post } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import { useState } from "react";
import TasksView from "@/components/TasksView";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TTaskAnswer } from "@/types/task";
import dynamic from "next/dynamic";


const Fireworks = dynamic(() => import("react-canvas-confetti/dist/presets/fireworks"))


export default function LessonTasksView({ data }: { data: ILesson }) {
    const [lesson, setLesson] = useState<ILesson>(data)
    const [showConfetti, setShowConfetti] = useState(false)

    const complete = async () => {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/complete_tasks/`)
        if (status === 200) {
            setLesson(data)
            setShowConfetti(data.result !== null && data.result >= 90)
        }
    }

    const skip = async (taskId: string) => {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/${taskId}/skip/`)
        if (status === 200) setLesson(data)
    }

    const answer = async (taskId: string, answer: TTaskAnswer) => {
        const {
            data,
            status
        } = await post<ILesson>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lesson?.id}/${taskId}/answer/`, { answer })
        if (status === 200) setLesson(data)
    }

    return (
        <div className="space-y-2 max-w-prose m-auto">
            {showConfetti && <Fireworks autorun={{ speed: 2, duration: 5000 }} />}
            <Link href={`/lessons/${lesson.id}`} className="flex gap-2 items-center"><ArrowLeftIcon className="size-5" />Назад
                к уроку</Link>
            {/* Header */}
            <div className="flex justify-between md:items-center flex-col md:flex-row gap-3 md:gap-0">
                <h1>Домашнее задание</h1>
                {!lesson.isTasksCompleted &&
                    <Button onClick={complete} disabled={lesson.isTasksCompleted} variant="outline"
                        className="md:text-sm">Завершить</Button>}
                {lesson.isTasksCompleted && <p><span className="font-semibold">Резльтат выполнения:</span> {lesson.result}</p>}
            </div>
            {/* Content */}
            <TasksView
                tasks={lesson?.tasks ?? []}
                disabled={lesson.isTasksCompleted}
                answerTask={answer}
                skipTask={skip}
            />
        </div>
    )
}
