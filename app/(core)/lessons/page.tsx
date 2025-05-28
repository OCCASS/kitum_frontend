import FilterBar from "./components/FilterBar";
import Lessons from "./components/Lessons";
import LessonsSkeleton from "./components/LessonsSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "./searchParams";
import { get } from "@/lib/fetch";
import ISubscription from "@/types/subscription";

export const metadata: Metadata = {
    title: "KITUM – уроки"
}

export default async function Page(props: { searchParams: Promise<SearchParams> }) {
    const searchParams = await props.searchParams;
    const { status, subscription } = await loadSearchParams(searchParams)
    // TODO: cache this
    const { data: subscriptions } = await get<ISubscription[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/available-subscriptions/`)

    return (
        <div className="space-y-3">
            <h1>Уроки</h1>
            <FilterBar subscriptions={subscriptions ?? []} />
            <Suspense fallback={<LessonsSkeleton />}>
                <Lessons status={status} subscription={subscription} />
            </Suspense>
        </div>
    )
}
