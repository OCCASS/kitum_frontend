"use server"

import { Suspense } from "react"
import SubscriptionsFeed from "@/components/SubscriptionsFeed"
import { EditUserAvatarForm, EditUserForm, Greeting } from "./components"
import SubscriptionsFeedSkeleton from "@/components/SubscriptionsFeed/SubscriptionsFeedSkeleton"

export default async function Me() {
    return (
        <div className="space-y-8">
            <Greeting />
            <section className="flex items-center gap-10">
                <EditUserAvatarForm />
            </section>
            <section>
                <EditUserForm />
            </section>
            <section id="subscribtion">
                <h1 className="mb-5">Текущая подписка</h1>
                <Suspense fallback={<SubscriptionsFeedSkeleton />}>
                    <SubscriptionsFeed />
                </Suspense>
            </section>
        </div>
    )
}
