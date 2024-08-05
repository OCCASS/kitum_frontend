"use client"

import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton"
import {SparklesIcon} from "@heroicons/react/24/solid"
import {generateVariant} from "@/app/(core)/training/actions";
import {useFormState} from "react-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {useUser} from "@/lib/providers/user";
import {LockClosedIcon} from "@heroicons/react/24/solid";


const DEFAULT_COMPLEXITY = "1"


function Item({text, value, textColor, current, setCurrent}: {
    text: string,
    value: string,
    textColor: string,
    current: string,
    setCurrent: Dispatch<SetStateAction<string>>
}) {
    return (
        <li>
            <input id={value} value={value} checked={current == value} type="radio" className="hidden peer"
                   name="complexity" required onChange={(e) => setCurrent(e.target.value)}/>
            <label htmlFor={value}
                   className={`block rounded-sm p-2 text-center cursor-pointer peer-checked:bg-tertiary-bg transition duration-300 ${textColor}`}>{text}</label>
        </li>
    )
}

export default function GenerateVariantSection() {
    const [_, action] = useFormState(generateVariant, {})
    const [complexity, setComplexity] = useState(DEFAULT_COMPLEXITY)
    const {user} = useUser()

    return (
        <section className="card relative overflow-hidden">
            <h2 className="mb-1 flex justify-center gap-1"><SparklesIcon className="size-6"/>Создать вариант</h2>
            <p className="mb-3 text-sm text-gray-500 text-center">Создать вариант выбранной сложности</p>
            <form className="space-y-3" action={action}>
                <Input placeholder="Название" className="w-full" name="name"/>
                <ul className="grid grid-cols-3 gap-2 bg-secondary-bg p-1 rounded border border-primary-border-color">
                    <Item text="Простой" value="1" textColor="text-green" current={complexity}
                          setCurrent={setComplexity}/>
                    <Item text="Средний" value="2" textColor="text-orange-500" current={complexity}
                          setCurrent={setComplexity}/>
                    <Item text="Сложный" value="3" textColor="text-red" current={complexity}
                          setCurrent={setComplexity}/>
                </ul>
                <SubmitButton className="w-full">Начать</SubmitButton>
            </form>
            {
                !user?.subscription &&
                <div
                    className="absolute inset-x-0 inset-y-0 z-10 bg-gray-300/70
                    flex flex-col items-center justify-center gap-2 text-gray-500 p-5 cursor-not-allowed
                    dark:bg-gray-700/70 dark:text-gray-400
                    "
                >
                    <LockClosedIcon className="size-8"/>
                    <p className="text-center">Для использования этой функции нужна подписка</p>
                </div>
            }
        </section>
    )
}
