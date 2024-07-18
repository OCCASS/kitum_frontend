"use client"

import ISubscription from "@/types/subscription";
import Button from "@/components/ui/Button";
import {post} from "@/lib/fetch";

export default function Subscription({subscription}: {subscription: ISubscription}) {
    const onClick = async () => {
        const {data} = await post<{confirmationUrl: string}>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions/${subscription.id}/order/`,
            {returnUrl: "http://localhost:3000/", description: subscription.title}
        )
        window.open(data.confirmationUrl, "_blank", "noopener,noreferrer")
    }

    return (
        <article className="card space-y-3" key={subscription.id}>
            <h2>{subscription.title}</h2>
            <p>Цена: <b>{subscription.price}/месяц</b></p>
            <Button onClick={onClick}>Купить</Button>
        </article>
    )
}
