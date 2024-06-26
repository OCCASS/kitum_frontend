"use client"

import { useFormState } from "react-dom"
import signup from "./actions"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Link from "next/link"
import SubmitButton from "@/components/ui/SubmitButton"

const SignUp = () => {
    const [state, action] = useFormState(signup, { message: "" })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-10">
                <h1 className="text-4xl md:text-5xl">Привет,<br />Добро пожаловать!</h1>
                <form action={action} className="space-y-10">
                    <div className="flex flex-col gap-4">
                        <Input type="text" placeholder="Имя" name="firstName" />
                        <Input type="text" placeholder="Фамилия" name="lastName" />
                        <Input type="email" placeholder="Почта" name="email" />
                        <Input type="password" placeholder="Пароль" name="password" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <SubmitButton className="w-full">Создать аккаунт</SubmitButton>
                        <p className="text-center">Уже есть аккаунт? <Link href="/signin" className="text-blue-500">Войти</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
