"use client"

import Select from "@/components/ui/Select"
import SubmitButton from "@/components/ui/SubmitButton"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {useCallback, useEffect, useMemo, useState} from "react"
import IVariant from "@/types/variant";
import {get} from "@/lib/fetch";
import {useFormState} from "react-dom";
import {startVariant} from "@/app/(core)/training/actions";

export default function SelectVariantSection() {
    const [state, action] = useFormState(startVariant, {})
    const [variants, setVariants] = useState<IVariant[]>([])
    const [year, setYear] = useState<number>()
    const [selectedVariant, setSelectedVariant] = useState<string>("")

    useEffect(() => {
        (async () => {
            const {data} = await get<IVariant[]>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/variants/?type=exam`
            );
            setVariants(data);
        })();
    }, []);

    const handleYearSelect = (value: number) => {
        setYear(value)
        setSelectedVariant("")
    }

    const uniqueYears = useMemo(
        () =>
            Array.from(
                new Set(
                    variants.map((variant) => variant.year).filter((year): year is number => year !== null)
                )
            ).sort(),
        [variants]
    );
    const yearVariants = useMemo(
        () => variants.filter((variant) => variant.year === year),
        [variants, year]
    );
    return (
        <section className="card flex flex-col">
            <h2 className="mb-1 flex justify-center gap-2"><MagnifyingGlassIcon className="size-6"/>Выбрать варинат</h2>
            <p className="mb-3 text-sm text-gray-500 text-center">Выбрать вариант прошлых лет</p>
            <form className="flex flex-col gap-3 flex-1" action={action}>
                <Select
                    name="year"
                    required
                    onChange={(e) => handleYearSelect(parseInt(e.target.value))}
                    value={year}
                    title="Выберите учебный год"
                    aria-label="Выберите учебный год"
                    defaultValue=""
                >
                    <option value="" disabled>Учебный год</option>
                    {uniqueYears.map(item => (
                        <option key={item} value={item.toString()}>{item - 1}/{item}</option>
                    ))}
                </Select>
                <Select
                    name="variant"
                    disabled={!year}
                    required
                    title="Выберите волну"
                    aria-label="Выберите волну"
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    value={selectedVariant}
                    defaultValue=""
                >
                    <option value="" disabled>Волна</option>
                    {yearVariants.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </Select>
                <SubmitButton className="w-full mt-auto" disabled={!(year && selectedVariant)}>Начать</SubmitButton>
            </form>
        </section>
    )
}
