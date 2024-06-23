"use client"

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useFormState } from "react-dom";
import requesetResetPassword from "./actions";

const ResetPassword = () => {
    const [state, action] = useFormState(requesetResetPassword, { message: "" })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-10">
                <h1 className="text-4xl md:text-5xl">Сбросить пароль</h1>
                <form className="space-y-5" action={action}>
                    <Input placeholder="Почта" name="email" type="email" className="w-full" />
                    <div className="space-y-1">
                        <Button type="submit" className="w-full">Восстановить</Button>
                        <span className="block text-gray-400 text-sm text-center">Вам на почту придет ссылка для восстановления</span>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ResetPassword;
