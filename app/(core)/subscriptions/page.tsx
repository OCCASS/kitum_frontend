"use server"

import Subscription from "./component";
import ISubscription from "@/types/subscription";
import { get } from "@/lib/fetch";

export default async function Page() {
    const { data } = await get<ISubscription[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions/unpurchased/`)

    return (
        <div className="space-y-3">
            <h1>Подписки</h1>
            {
                data.length === 0 ?
                    <p className="text-center text-gray-500">Все подписки куплены!</p>
                    :
                    <div className="feed">{data.map(item => <Subscription key={item.id} subscription={item} />)}</div>
            }
        </div>
    )
}
