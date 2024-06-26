"use client"

import Input from "@/components/ui/Input";
import { useFormState } from "react-dom";
import requesetResetPassword from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

export default function ResetPassword() {
    const [, action] = useFormState(requesetResetPassword, { message: "" })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-10">
                <h1 className="text-4xl md:text-5xl">Сбросить пароль</h1>
                <form className="space-y-5" action={action}>
                    <Input placeholder="Почта" name="email" type="email" className="w-full" />
                    <div className="space-y-1">
                        <SubmitButton className="w-full">Восстановить</SubmitButton>
                        <span className="block text-gray-400 text-sm text-center">Вам на почту придет ссылка для восстановления</span>
                    </div>
                </form>
            </div>
        </div>
    )

}

