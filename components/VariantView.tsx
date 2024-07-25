"use client"

import Button from "@/components/ui/Button"
import { post } from "@/lib/fetch"
import IVariant from "@/types/variant"
import { useState } from "react"
import TasksView from "@/components/TasksView"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { TTaskAnswer } from "@/types/task";
import dynamic from "next/dynamic";
import Modal from "./ui/Modal"

const Fireworks = dynamic(() => import("react-canvas-confetti/dist/presets/fireworks"))

export default function VariantView({ data }: { data: IVariant }) {
    const [variant, setVariant] = useState<IVariant>(data)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showStartModal, setShowStartModal] = useState(false)
    const [showCompleteModal, setShowCompleteModal] = useState(false)

    const start = async () => {
        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/start/`)
        if (status === 200) setVariant(data)
    }

    const complete = async () => {
        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/complete/`)
        if (status === 200) {
            setVariant(data)
            setShowCompleteModal(false)
            setShowConfetti(data.result !== null && data.result >= 90)
        }
    }

    const answer = async (taskId: string, answer: TTaskAnswer) => {
        if (answer.length === 0 || answer.includes("")) return

        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/${taskId}/answer/`, { answer })
        if (status === 200) setVariant(data)
    }

    const skip = async (taskId: string) => {
        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/${taskId}/skip/`)
        if (status === 200) setVariant(data)
    }

    return (
        <div className="space-y-3 max-w-prose m-auto">
            {showConfetti && <Fireworks autorun={{ speed: 2, duration: 5000 }} />}
            <Modal title="Уверены?" show={showCompleteModal} setShow={setShowCompleteModal} closable={false}>
                <p className="mb-5">Вы уверены, что хотите завершить выполнение варианата?</p>
                <div className="w-full flex justify-between flex-col md:flex-row gap-2">
                    <Button className="text-sm" onClick={complete} variant="gray">Да, завершить</Button>
                    <Button className="text-sm" onClick={() => setShowCompleteModal(false)} variant="outline">Нет, продолжить</Button>
                </div>
            </Modal>
            <Link href="/variants" className="flex gap-2 items-center"><ArrowLeftIcon className="size-5" />Назад к вариантам</Link>
            <div className="w-full flex justify-between md:items-center flex-col md:flex-row gap-3 md:gap-0">
                <h1>{variant.title}</h1>
                {(variant.isStarted && !variant.isCompleted) && <Button onClick={() => setShowCompleteModal(true)} disabled={variant.isCompleted} variant="outline" className="md:text-sm">Завершить</Button>}
                {variant.isCompleted && <p><span className="font-semibold">Результат выполнения:</span> {variant.result}</p>}
            </div>
            {
                variant.isStarted || variant.isCompleted ?
                    <TasksView
                        tasks={variant.tasks}
                        disabled={variant.isCompleted || !variant.isStarted}
                        answerTask={answer}
                        skipTask={skip}
                    />
                    :
                    <div>
                        <Modal title="Начать вариант?" show={showStartModal} setShow={setShowStartModal} closable={false}>
                            <p className="mb-5">Начать вариант?</p>
                            <div className="w-full flex justify-between gap-2 flex-col md:flex-row">
                                <Button className="text-sm" onClick={start} variant="gray">Начать</Button>
                                <Button className="text-sm" variant="outline" onClick={() => setShowStartModal(false)}>Отмена</Button>
                            </div>
                        </Modal>
                        <Button onClick={() => setShowStartModal(true)} disabled={variant.isCompleted}>Начать</Button>
                    </div>
            }
        </div>
    )
}
