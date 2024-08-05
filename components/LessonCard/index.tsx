import ILesson from "@/types/lesson";
import { formattedDate } from "@/utils/date";
import Link from "next/link";
import LinkButton from "@/components/ui/LinkButton";
import { ArrowPathIcon, CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";

function LessonCardStatusBar({ lesson }: { lesson: ILesson }) {
    const defaultClassName = "flex items-center gap-1"
    if (lesson.isClosed) return <p className={`${defaultClassName} text-gray-500/50`}><XMarkIcon className="size-5" /> Урок закрыт</p>
    if (lesson.status === "tasks_completed") return <p className={`${defaultClassName} text-green`}><CheckBadgeIcon className="size-5" /> Урок пройден</p>
}

export default function LessonCard({ lesson }: { lesson: ILesson }) {
    const opensAt = new Date(Date.parse(lesson.opensAt))
    const disabled = lesson.isClosed

    return (
        <article className={`card flex flex-col gap-3 ${disabled && "pointer-events-none"}`}>
            {/* Content */}
            <div className="flex-1 space-y-1">
                <LessonCardStatusBar lesson={lesson} />
                <h2 className={`line-clamp-2 ${disabled && "text-gray-500/50"}`}><Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link></h2>
                {lesson.status === "tasks_completed" && <p>Результат выполнения: {lesson.result}</p>}
            </div>
            {/* Footer */}
            <div className="space-y-2">
                {lesson.status === "completed" ?
                    <LinkButton href={`/lessons/${lesson.id}/tasks`} variant="outline">Домашнее задание</LinkButton>
                    :
                    <LinkButton href={`/lessons/${lesson.id}`} className={`${disabled && "bg-gray-400/50 text-gray-600"}`}>Перейти</LinkButton>
                }
                <p className="text-sm text-gray-500">Урок от: {formattedDate(opensAt)}</p>
            </div>
        </article>
    )
}
