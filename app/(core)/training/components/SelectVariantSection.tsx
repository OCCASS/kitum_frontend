"use client"

import Select from "@/components/ui/Select"
import SubmitButton from "@/components/ui/SubmitButton"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function SelectVariantSection() {
    const [period, setPeriod] = useState("")
    const [name, setName] = useState("")

    return (
        <section className="card flex flex-col">
            <h2 className="mb-1 flex justify-center gap-2"><MagnifyingGlassIcon className="size-6" />Выбрать варинат</h2>
            <p className="mb-3 text-sm text-gray-500 text-center">Выбрать вариант прошлых лет</p>
            <form className="flex flex-col gap-3 flex-1">
                <Select
                    name="period"
                    required
                    onChange={(e) => setPeriod(e.target.value)}
                    value={period}
                    title="Выберите учебный год"
                    aria-label="Выберите учебный год"
                >
                    <option value="" disabled>Учебный год</option>
                    <option value="2023/24">2023/24</option>
                    <option value="2022/23">2022/23</option>
                    <option value="2021/22">2021/22</option>
                    <option value="2020/21">2020/21</option>
                </Select>
                <Select
                    name="name"
                    disabled={!period}
                    required
                    title="Выберите волну"
                    aria-label="Выберите волну"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                >
                    <option value="" disabled>Волна</option>
                    <option value="1">Основная влона 07.06.2024</option>
                    <option value="2">Досрок 08.06.2024</option>
                </Select>
                <SubmitButton className="w-full mt-auto" disabled={!(period && name)}>Начать</SubmitButton>
            </form>
        </section>
    )
}
