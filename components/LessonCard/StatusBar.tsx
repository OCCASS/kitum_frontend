"use client"

import { useUser } from "@/lib/providers/user";
import ILesson from "@/types/lesson";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";

const StatusBar = ({ lesson }: { lesson: ILesson }) => {
    const { user } = useUser()

    if (!user) return

    const defaultClassName = "flex items-center gap-1"
    if (lesson.isClosed)
        return <p className={`${defaultClassName} text-gray-500/50`}><XMarkIcon className="size-5" /> Урок закрыт</p>
    if (!user.subscription?.withHomeWork && lesson.status === "completed")
        return <p className={`${defaultClassName} text-green`}><CheckBadgeIcon className="size-5" /> Урок пройден</p>
    if (lesson.status === "tasks_completed")
        return <p className={`${defaultClassName} text-green`}><CheckBadgeIcon className="size-5" /> Урок пройден</p>
}

export default StatusBar;
