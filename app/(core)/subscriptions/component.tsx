"use client"

import ISubscription from "@/types/subscription";
import {post} from "@/lib/fetch";
import LoadingButton from "@/components/ui/LoadingButton";
import {useState} from "react";

export default function Subscription({subscription}: { subscription: ISubscription }) {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        setIsLoading(true)
        const {data, status} = await post<{ confirmationUrl: string }>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions/${subscription.id}/order/`,
            {returnUrl: process.env.NEXT_PUBLIC_ROOT_URL, description: subscription.title}
        )
        setIsLoading(false)
        if (status === 200) window.location.href = data.confirmationUrl
    }

    return (
        <article className="card space-y-3 flex flex-col items-start" key={subscription.id}>
            <div className="flex-1 space-y-3">
                <h2>{subscription.title}</h2>
                <p>Цена: <b>{subscription.price}/месяц</b></p>
            </div>
            <LoadingButton className="inline" onClick={onClick} isLoading={isLoading}>Купить</LoadingButton>
        </article>
    )
}
