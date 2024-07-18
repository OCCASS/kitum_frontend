import IUserSubscription from "@/types/user_subscription";
import { formattedDate } from "@/utils/date";

export default function SubscriptionsFeedItem({ subscription }: { subscription: IUserSubscription }) {
    const activeBefore: Date = new Date(Date.parse(subscription.activeBefore))

    return (
        <article className="card space-y-3">
            <h2>{subscription.title}</h2>
            <p className="text-gray-500">Активна до: {formattedDate(activeBefore)}</p>
        </article>
    )
}
