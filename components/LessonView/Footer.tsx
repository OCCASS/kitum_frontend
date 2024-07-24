import ILesson from "@/types/lesson";
import Link from "next/link";
import Button from "@/components/ui/Button";

type TLessonFooterProps = {
    lesson: ILesson,
    complete: () => void,
}

export default function LessonViewFooter({ lesson, complete }: TLessonFooterProps) {
    if (["completed", "tasks_completed"].includes(lesson.status)) {
        return <div className="flex justify-end">
            <Link type="button" href={`/lessons/${lesson.id}/tasks`} className="px-5 py-2 rounded border border-gray-300 inline-block">Домашнее задание</Link>
        </div>
    }

    return (
        <div className="space-x-2 flex justify-end">
            <Button onClick={complete}>Завершить</Button>
        </div>
    )

}
