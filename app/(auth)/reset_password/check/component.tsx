"use client"

import { useSearchParams } from "next/navigation";
import resetPassword from "./actions";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState } from "react";

const NewPassword = () => {
    const searchParams = useSearchParams()
    const [, action] = useActionState(resetPassword, { message: "" })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-10">
                <h1 className="text-4xl md:text-5xl">Новый пароль</h1>
                <form className="flex flex-col gap-5" action={action}>
                    <Input placeholder="Пароль" name="new_password" type="password" />
                    <Input type="hidden" value={searchParams.get("t") ?? ""} name="token" />
                    <SubmitButton>Отправить</SubmitButton>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;
