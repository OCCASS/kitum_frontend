import ILesson from "@/types/lesson";
import Link from "next/link";
import Button from "@/components/ui/Button";

type TLessonFooterProps = {
    lesson: ILesson,
    complete: () => void,
    skip: () => void
}

export default function LessonFooter({ lesson, complete, skip }: TLessonFooterProps) {
    if (lesson.isCompleted) {
        return <div className="flex justify-end">
            <Link type="button" href={`/lessons/${lesson.id}/tasks`} className="px-5 py-2 rounded border border-gray-300 inline-block">Домашнее задание</Link>
        </div>
    }

    return (
        <div className="space-x-2">
            <Button onClick={complete}>Complete</Button>
            <Button onClick={skip} className="bg-red">Skip</Button>
        </div>
    )

}
