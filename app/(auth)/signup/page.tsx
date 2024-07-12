"use client"

import { useFormState } from "react-dom"
import signup from "./actions"
import Input from "@/components/ui/Input"
import Link from "next/link"
import SubmitButton from "@/components/ui/SubmitButton"

export default function SignUp() {
    const [state, action] = useFormState(signup, { message: "", email: "", password: "" })

    return (
        <div className="space-y-10">
            <h1 className="text-5xl">Привет,<br />Добро пожаловать!</h1>
            <form action={action} className="space-y-10">
                <div className="flex flex-col gap-4">
                    <Input type="text" placeholder="Имя" name="firstName" />
                    <Input type="text" placeholder="Фамилия" name="lastName" />
                    <div>
                        <Input type="email" placeholder="Почта" name="email" className="block w-full" />
                        {state.email && <span className="text-sm text-red">{state.email}</span>}
                    </div>
                    <div className="space-y-1">
                        <Input type="password" placeholder="Пароль" name="password" className="block w-full" />
                        {
                            state.password &&
                            <ul className="list-disc list-inside">
                                {
                                    state.password.map((item: string, index: number) =>
                                        <li key={index} className="text-sm text-red">{item}</li>)
                                }
                            </ul>
                        }
                    </div>
                </div>
                <div className="space-y-2 flex flex-col">
                    <SubmitButton className="w-full">Создать аккаунт</SubmitButton>
                    <p className="text-center">Уже есть аккаунт? <Link href="/signin" className="text-blue-500">Войти</Link></p>
                </div>
            </form>
        </div>
    )
}
