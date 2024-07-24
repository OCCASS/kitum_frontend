import FilterBar from "./components/FilterBar";
import Lessons from "./components/Lessons";
import LessonsSkeleton from "./components/LessonsSkeleton";
import { Suspense } from "react";
import Head from "next/head";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – уроки"
}

export default async function Page({searchParams}: {searchParams: {status?: string}}) {
    return (
        <div className="space-y-3">
            <h1>Уроки</h1>
            <FilterBar />
            <Suspense fallback={<LessonsSkeleton />}>
                <Lessons status={searchParams?.status ?? ""} />
            </Suspense>
        </div>
    )
}
