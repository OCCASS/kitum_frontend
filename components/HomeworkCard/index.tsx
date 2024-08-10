import ILesson from "@/types/lesson";
import {formattedDatetime} from "@/utils/date";
import {CheckBadgeIcon, ClockIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import LinkButton from "@/components/ui/LinkButton";
import {twMerge} from "tailwind-merge";

export default function HomeworkCard({lesson, className}: { lesson: ILesson, className?: string }) {
    const now: any = new Date()
    const deadline: any = new Date(Date.parse(lesson.completeTasksDeadline))
    const deadlineIsSoon = (deadline - now) <= 60 * 60 * 24 * 1000  // less than one day

    return (
        <article className={twMerge("card flex flex-col gap-3", className)}>
            {/* Content */}
            <div className="flex-1 space-y-1">
                {lesson.status === "tasks_completed" &&
                    <p className="flex items-center gap-2 text-green"><CheckBadgeIcon className="size-5"/> Выполнено
                    </p>}
                <h2 className="line-clamp-2"><Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link></h2>
                {lesson.status !== "tasks_completed" &&
                    <p className={`flex items-center gap-2 ${deadlineIsSoon && "text-red"}`}><ClockIcon
                        className="size-5"/> Дедлайн: {formattedDatetime(deadline)}</p>}
                {lesson.status === "tasks_completed" && <p>Результат выполнения: 54</p>}
            </div>
            {/* Footer */}
            <div>
                {
                    lesson.status === "tasks_completed" ?
                        <LinkButton href={`/lessons/${lesson.id}/tasks`} variant="outline">Результаты</LinkButton>
                        :
                        <LinkButton href={`/lessons/${lesson.id}/tasks`}>Домашнее задание</LinkButton>
                }
            </div>
        </article>
    )
}
