import Lesson from "./components";
import {Suspense} from "react";
import LessonViewSkeleton from "@/components/LessonView/Skeleton";

type TLessonProps = {
    params: { id: string }
}

export default async function Page({params}: TLessonProps) {
    return (
        <Suspense fallback={<LessonViewSkeleton/>}>
            <Lesson id={params.id}/>
        </Suspense>
    )
}
