"use client"

import ILesson from "@/types/lesson"
import LinkButton from "../ui/LinkButton"
import { formattedDate } from "@/utils/date"
import { useUser } from "@/lib/providers/user"

export type TFooterProps = {
    lesson: ILesson
}

const Footer = ({ lesson }: TFooterProps) => {
    const opensAt = new Date(Date.parse(lesson.opensAt))
    const { user } = useUser()

    if (!user) return null

    const getButton = () => {
        if (!user.subscriptions.some(s => lesson.subscription.id === s.id && s.withHomeWork) || lesson.status !== "completed")
            return <LinkButton href={`/lessons/${lesson.id}`} className={`${lesson.isClosed && "bg-gray-400/50 text-gray-600"}`}>Перейти</LinkButton>
        return <LinkButton href={`/lessons/${lesson.id}/tasks`} variant="outline">Домашнее задание</LinkButton>
    }

    return (
        <div className="space-y-2">
            {getButton()}
            <p className="text-sm text-gray-500">Урок от: {formattedDate(opensAt)}</p>
        </div>
    )
}

export default Footer;
