import ILesson from "@/types/lesson";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Files from "@/components/Files";

type TLessonFooterProps = {
    lesson: ILesson,
    complete: () => void,
}

const Buttons = ({ lesson, complete }: TLessonFooterProps) => {
    if (["completed", "tasks_completed"].includes(lesson.status)) {
        return (
            <div className="flex justify-end">
                <Link
                    type="button"
                    href={`/lessons/${lesson.id}/tasks`}
                    className="px-5 py-2 rounded border border-gray-300 inline-block"
                >
                    Домашнее задание
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="space-x-2 flex justify-end">
                <Button onClick={complete}>Завершить</Button>
            </div>
        </div>
    )
}

export default function LessonViewFooter({ lesson, complete }: TLessonFooterProps) {
    return (
        <div>
            <Files files={lesson.files} />
            <Buttons lesson={lesson} complete={complete} />
        </div>
    )

}
