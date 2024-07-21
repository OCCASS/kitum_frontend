"use client"

import Select from "@/components/ui/Select"
import SubmitButton from "@/components/ui/SubmitButton"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function SelectVariantSection() {
    const [period, setPeriod] = useState("")

    return (
        <section className="card flex flex-col justify-between">
            <div>
                <h2 className="mb-1 flex justify-center gap-2"><MagnifyingGlassIcon className="size-6" />Выбрать варинат</h2>
                <p className="mb-3 text-sm text-gray-500 text-center">Выбрать вариант прошлых лет</p>
                <form className="flex flex-col gap-3">
                    <Select
                        name="period"
                        required
                        onChange={(e) => setPeriod(e.target.value)}
                        title="Выберите учебный год"
                        aria-label="Выберите учебный год"
                    >
                        <option value="" disabled selected>Учебный год</option>
                        <option>2023/24</option>
                        <option>2022/23</option>
                        <option>2021/22</option>
                        <option>2020/21</option>
                    </Select>
                    <Select
                        name="name"
                        disabled={!period}
                        required
                        title="Выберите волну"
                        aria-label="Выберите волну"
                    >
                        <option value="" disabled selected>Волна</option>
                        <option>Основная влона 07.06.2024</option>
                        <option>Досрок 08.06.2024</option>
                    </Select>
                </form>
            </div>
            <SubmitButton className="w-full">Начать</SubmitButton>
        </section>
    )
}
