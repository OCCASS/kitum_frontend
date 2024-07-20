"use client"

import { useFormState } from "react-dom"
import signin from "./actions"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useUser } from "@/lib/providers/user"
import SubmitButton from "@/components/ui/SubmitButton"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

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
        <div className="space-y-10">
            <h1 className="text-4xl md:text-5xl">Привет,<br />С возвращением!</h1>
            <form action={action} className="space-y-5 flex flex-col">
                <Input type="email" placeholder="Почта" name="email" />
                <div className="flex gap-1 flex-col items-end">
                    <Input type="password" placeholder="Пароль" name="password" className="w-full" />
                    <Link href="/reset_password">Забыл пароль?</Link>
                </div>
                {
                    state.message &&
                    <section className="flex gap-2 items-center justify-center text-center text-red border border-red py-2 rounded bg-error-bg">
                        <ExclamationCircleIcon className="size-6" />
                        {state.message}
                    </section>
                }
                <div className="space-y-2 flex flex-col">
                    <SubmitButton className="px-10">Войти</SubmitButton>
                    <p className="text-center">Нет аккаунта? <Link href="/signup" className="text-blue-500">Давай создадим!</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignIn;
