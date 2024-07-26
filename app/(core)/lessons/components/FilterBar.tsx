"use client"

import Select from "@/components/ui/Select";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLessonsUrlParams } from "@/app/(core)/lessons/utils";

export default function FilterBar() {
    const router = useRouter()
    const [status, setStatus] = useState("all")

    useEffect(() => {
        router.push(`/lessons?${getLessonsUrlParams(status)}`)
    }, [router, status])

    return (
        <section className="w-full flex gap-2 items-center border-b pb-2 border-primary-border-color overflow-x-auto">
            <span className="p-2 border rounded border-primary-border-color text-gray-400">
                <FunnelIcon className="size-5" />
            </span>
            <Select className="text-sm" onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="all">Все</option>
                <option value="tasks_completed">Решено ДЗ</option>
                <option value="completed">Пройден</option>
                <option value="started">В процессе</option>
                <option value="not_started">Не начат</option>
            </Select>
        </section>
    )
}
