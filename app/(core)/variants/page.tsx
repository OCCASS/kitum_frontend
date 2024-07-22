"use client"

import {Suspense, useState} from "react"
import VariantsSkeleton from "./components/VariantsSkeleton";
import Variants from "./components/Variants";
import Select from "@/components/ui/Select";
import {FunnelIcon} from "@heroicons/react/24/outline";

export default function Page() {
    const [generated, setGenerated] = useState<string>()
    const [status, setStatus] = useState<string>()

    return (
        <div className="space-y-3">
            <h1>Варианты</h1>
            <section className="w-full flex gap-2 items-center border-b pb-2">
                <span className="p-2 border rounded border-primary-border-color text-gray-400">
                    <FunnelIcon className="size-5"/>
                </span>
                <Select className="text-sm" onChange={(e) => setGenerated(e.target.value)}>
                    <option selected value="false">По программе</option>
                    <option value="true">Сгенерированные</option>
                    <option value="all">Все</option>
                </Select>
                <Select className="text-sm" onChange={(e) => setStatus(e.target.value)}>
                    <option selected disabled value="">Статус</option>
                    <option value="all">Все</option>
                    <option value="completed">Пройден</option>
                    <option value="in_progress">В процессе</option>
                    <option value="not_started">Не начатые</option>
                </Select>
            </section>
            <Suspense fallback={<VariantsSkeleton/>}>
                <Variants generated={generated} status={status}/>
            </Suspense>
        </div>
    )
}

