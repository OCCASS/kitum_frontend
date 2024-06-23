"use client"

import Button from "@/components/ui/Button"
import { post } from "@/lib/fetch"
import IVariant from "@/types/variant"
import { useState } from "react"
import Tasks from "@/components/Tasks"

export default function VariantView({ data }: { data: IVariant }) {
    const [variant, setVariant] = useState<IVariant>(data)

    const start = async () => {
        if (confirm("Start variant?")) {
            const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/start/`)
            if (status === 200) setVariant(data)
        }
    }

    const complete = async () => {
        if (confirm("Complete variant?")) {
            const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/complete/`)
            if (status === 200) setVariant(data)
        }
    }

    const answer = async (taskId: string, answer: string) => {
        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/${taskId}/answer/`, { answer })
        if (status === 200) setVariant(data)
    }

    const skip = async (taskId: string) => {
        const { data, status } = await post<IVariant>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/${variant?.id}/${taskId}/skip/`)
        if (status === 200) setVariant(data)
    }

    return (
        <div className="space-y-3">
            <div className="w-full flex justify-between items-center">
                <h1>{variant.title}</h1>
                {variant.isStarted && <Button onClick={complete} disabled={variant.isCompleted} variant="outline" className="text-sm">Complete</Button>}
            </div>
            {
                variant.isStarted ?
                    <Tasks
                        tasks={variant.tasks}
                        disabled={variant.isCompleted || !variant.isStarted}
                        answerTask={answer}
                        skipTask={skip}
                    />
                    :
                    <Button onClick={start} disabled={variant.isCompleted}>Начать</Button>
            }
        </div>
    )
}
