"use client"

import Input from "@/components/ui/Input";
import requestResetPassword from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
    const [state, action] = useActionState(requestResetPassword, { status: false })
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    useEffect(() => {
        if (state.status) setSent(true)
    }, [state]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {
                sent ?
                    <div className="space-y-2">
                        <h1 className="text-center">Ссылка отправлена</h1>
                        <p className="text-center">
                            Ссылка на сброс пароля отправлена на Вашу почту <b>{email}</b>. Выполните все действия по
                            инструкции в сообщении. <Link href="/signin" className="text-blue">Перейти на страницу входа</Link>
                        </p>
                    </div>
                    :
                    <div className="space-y-10">
                        <h1 className="text-4xl md:text-5xl">Сбросить пароль</h1>
                        <form className="space-y-5" action={action}>
                            <Input
                                placeholder="Почта"
                                name="email"
                                type="email"
                                className="w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="space-y-1">
                                <SubmitButton className="w-full">Восстановить</SubmitButton>
                                <span className="block text-gray-400 text-sm text-center">Вам на почту придет ссылка для восстановления</span>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

