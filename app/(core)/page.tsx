"use server"

import HomeworkSlider from "@/components/HomeworkSlider";
import HomeworkSliderSkeleton from "@/components/HomeworkSlider/Skeleton";
import NotCompletedLessonsSlider from "@/components/NotCompletedLessonsSlider";
import NotCompletedLessonsSliderSkeleton from "@/components/NotCompletedLessonsSlider/Skeleton";
import { Suspense } from "react";

export default async function Home() {
    return (
        <div className="space-y-8">
            <section className="space-y-3">
                <h1>Оставшиеся уроки</h1>
                <Suspense fallback={<NotCompletedLessonsSliderSkeleton />}>
                    <NotCompletedLessonsSlider />
                </Suspense>
            </section>
            <section className="space-y-3">
                <h1>Оставшаяся домашняя работа</h1>
                <Suspense fallback={<HomeworkSliderSkeleton />}>
                    <HomeworkSlider />
                </Suspense>
            </section>
        </div>
    );
}
