import { get } from "@/lib/fetch";
import ILesson from "@/types/lesson";
import HomeWorkItem from "./HomeWorkItem";

export default async function HomeWorksFeed() {
    const { data: lessons } = await get<ILesson[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/homework/`)
    return <div className="feed">{lessons.map(item => <HomeWorkItem key={item.id} lesson={item} />)}</div>
}
