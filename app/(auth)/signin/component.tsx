"use client"

import { useFormState } from "react-dom"
import signin from "./actions"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useUser } from "@/lib/providers/user"

const SignIn = () => {
    const searchParms = useSearchParams()
    const { setUser } = useUser()

    const signinWrapper = async (prevState: any, formData: FormData) => {
        const result = await signin(prevState, formData)
        if (result.success) {
            if (setUser) setUser(result.user)
            redirect(searchParms.get("redirect_to") ?? "/")
        }
        else return result
    }

    const [state, action] = useFormState(signinWrapper, { success: false, message: "", user: undefined })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-10">
                <h1 className="text-4xl md:text-5xl">Привет,<br />С возвращением!</h1>
                <form action={action} className="space-y-5 flex flex-col">
                    <Input type="email" placeholder="Почта" name="email" />
                    <div className="space-y-1">
                        <Input type="password" placeholder="Пароль" name="password" className="w-full" />
                        <Link href="/reset_password" className="block text-right">Забыл пароль?</Link>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Button type="submit" className="px-10">Войти</Button>
                        <p className="text-center">Нет аккаунта? <Link href="/signup" className="text-blue-500">Давай создадим!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
