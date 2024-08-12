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
        <article className="card flex flex-col items-start gap-5" key={subscription.id}>
            <div className="flex-1 space-y-3">
                <h2>{subscription.title}</h2>
                <ul className="list-inside list-disc">
                    {subscription.advantages.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <div className="w-full flex justify-between items-center">
                <LoadingButton className="px-6" onClick={onClick} isLoading={isLoading}>Купить</LoadingButton>
                <h2>{subscription.price}₽ /мес</h2>
            </div>
        </article>
    )
}
