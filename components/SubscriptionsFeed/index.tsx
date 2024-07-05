"use server"

import { get } from "@/lib/fetch";
import ISubscription from "@/types/subscription";
import SubscriptionsFeedItem from "./Item";

export default async function SubscriptionsFeed() {
    const { data: subscriptions } = await get<ISubscription[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions/my/`)

    if (subscriptions.length === 0) {
        return <p className="text-center text-gray-500">Список подписок пуст!</p>
    }

    return <div className="feed">{subscriptions.map(item => <SubscriptionsFeedItem key={item.id} subscription={item} />)}</div>
}
