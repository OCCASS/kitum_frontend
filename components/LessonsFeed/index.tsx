import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import LessonItem from "./LessonItem";


export default async function LessonsFeed() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/`)
    return <div className="feed">{lessons.map(item => <LessonItem key={item.id} lesson={item} />)}</div>
}
