"use client"

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ISubscription from "@/types/subscription";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

export default function FilterBar({ subscriptions }: { subscriptions: ISubscription[] }) {
    const [status, setStatus] = useQueryState("status", { defaultValue: "", shallow: false, history: "push" })
    const [subscription, setSubscription] = useQueryState("subscription", { defaultValue: "", shallow: false, history: "push" })

    return (
        <section className="w-full flex gap-2 items-center border-b pb-2 border-primary-border-color overflow-x-scroll">
            <span className="p-2 border rounded border-primary-border-color text-gray-400">
                <FunnelIcon className="size-5" />
            </span>
            <Select className="text-sm" onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="">Все</option>
                <option value="tasks_completed">Решено ДЗ</option>
                <option value="completed">Пройден</option>
                <option value="started">В процессе</option>
                <option value="not_started">Не начат</option>
            </Select>
            {
                subscriptions.map(
                    (item) =>
                        <Button
                            key={item.id}
                            className={twMerge(
                                "bg-secondary-bg text-primary-text text-nowrap",
                                subscription == item.id && "bg-tertiary-bg")
                            }
                            variant="outline"
                            size="sm"
                            onClick={() => setSubscription(prev => prev === item.id ? "" : item.id)}
                        >
                            {item.title}
                        </Button>
                )
            }
        </section>
    )
}
