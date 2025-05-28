import ILesson from "@/types/lesson";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Footer from "./Footer";
import StatusBar from "./StatusBar";

export default function LessonCard({ lesson, className }: { lesson: ILesson, className?: string }) {
    const disabled = lesson.isClosed

    return (
        <article className={twMerge("card flex flex-col gap-3", disabled && "pointer-events-none", className)}>
            <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">{lesson.subscription.title}</p>
                <StatusBar lesson={lesson} />
                <h2 className={`line-clamp-2 ${disabled && "text-gray-500/50"}`}><Link
                    href={`/lessons/${lesson.id}`}>{lesson.title}</Link></h2>
            </div>
            <Footer lesson={lesson} />
        </article>
    )
}
