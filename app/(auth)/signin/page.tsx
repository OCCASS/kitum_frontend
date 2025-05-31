"use client"

import signin from "./actions"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useUser } from "@/lib/providers/user"
import SubmitButton from "@/components/ui/SubmitButton"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useActionState } from "react"
import {
    getBrowserFingerprint,
    getBrowserFingerprintData,
} from "fingerprint-browser";


export default function Page() {
    const searchParms = useSearchParams()
    const { setUser } = useUser()

    const signinWrapper = async (prevState: any, formData: FormData) => {
        const fingerprint = getBrowserFingerprint()
        const fingerprintData = getBrowserFingerprintData()
        const result = await signin(prevState, formData, fingerprint, fingerprintData.userAgent)
        if (result.success) {
            if (setUser) setUser(result.user)
            redirect(searchParms.get("redirect_to") ?? "")
        }
        else return result
    }

    const [state, action] = useActionState(signinWrapper, { success: false, message: "", user: undefined })

    return (
        <div className="space-y-10">
            <h1 className="text-4xl md:text-5xl">Привет,<br />С возвращением!</h1>
            <form action={action} className="space-y-5 flex flex-col">
                <Input type="email" placeholder="Почта" name="email" />
                <div className="flex gap-1 flex-col items-end">
                    <Input type="password" placeholder="Пароль" name="password" className="w-full" />
                </div>
                {
                    state.message &&
                    <section className="flex gap-2 items-center justify-center text-center text-red border border-red py-2 rounded bg-error-bg">
                        <ExclamationCircleIcon className="size-6" />
                        {state.message}
                    </section>
                }
                <SubmitButton className="px-10">Войти</SubmitButton>
            </form>
        </div>
    )
}
