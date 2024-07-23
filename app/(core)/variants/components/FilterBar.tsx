"use client"

import Select from "@/components/ui/Select";
import {FunnelIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getVariantsUrlParams} from "@/app/(core)/variants/utils";

export default function FilterBar() {
    const router = useRouter()
    const [generated, setGenerated] = useState("false")
    const [status, setStatus] = useState("")

    useEffect(() => {
        router.push(`/variants?${getVariantsUrlParams(status, generated)}`)
    }, [router, generated, status])

    return (
        <section className="w-full flex gap-2 items-center border-b pb-2">
                <span className="p-2 border rounded border-primary-border-color text-gray-400">
                    <FunnelIcon className="size-5"/>
                </span>
            <Select className="text-sm" onChange={(e) => setGenerated(e.target.value)} value={generated}>
                <option value="false">По программе</option>
                <option value="true">Сгенерированные</option>
                <option value="all">Все</option>
            </Select>
            <Select className="text-sm" onChange={(e) => setStatus(e.target.value)} value={status}>
                <option disabled value="">Статус</option>
                <option value="all">Все</option>
                <option value="completed">Пройден</option>
                <option value="in_progress">В процессе</option>
                <option value="not_started">Не начатые</option>
            </Select>
        </section>
    )
}