"use client"

import ISubscription from "@/types/subscription";
import {post} from "@/lib/fetch";
import LoadingButton from "@/components/ui/LoadingButton";
import React, {useState} from "react";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

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

    // TODO: when click start learning – open modal with information and purchase button
    return (
        <article className="card flex flex-col items-start gap-7" key={subscription.id}>
            <div className="flex-1 space-y-5 w-full">
                <h1 className="text-xl text-center">{subscription.title}</h1>
                <h2 className="text-center text-2xl font-normal">{Math.round(subscription.price)}₽ <span
                    className="text-sm text-gray-400 font-normal">/ месяц</span></h2>
                <ul className="space-y-1">
                    {
                        subscription.advantages.map((item, index) =>
                            <li className="flex items-start gap-1" key={index}><CheckCircleIcon
                                className="size-6 text-green"/> {item}</li>)
                    }
                </ul>
            </div>
            <div className="w-full space-y-2">
                <LoadingButton className="w-full" onClick={onClick} isLoading={isLoading}>Начать учиться</LoadingButton>
                <Button variant="outline" className="w-full">Узанть подробнее</Button>
            </div>
        </article>
    )
}
