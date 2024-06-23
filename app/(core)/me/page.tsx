"use client"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Image from "next/image"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { editUser } from "./actions"
import { useUser } from "@/lib/providers/user"

export default function Me() {
    const { user, setUser } = useUser()
    const [state, action] = useFormState(editUser, { message: "", user: null })

    useEffect(() => {
        if (state.user) setUser(state.user)
    }, [state, setUser])

    if (!user) return null

    return (
        <div className="space-y-5">
            <section className="space-y-5">
                <h1>Профиль</h1>
                <Image src={user.avatar} alt="Аватарка" width="100" height="100" className="rounded-full object-cover" />
                <form action={action} className="space-y-3">
                    <Input placeholder="Имя" defaultValue={user?.firstName} className="block" name="firstName" />
                    <Input placeholder="Фамилия" defaultValue={user?.lastName} className="block" name="lastName" />
                    <Button type="submit">Изменить</Button>
                </form>
            </section>
            <section id="subscribtion">
                <h1 className="mb-5">Текущая подписка</h1>
                <p>Бла-бла-бла пока этой информации нет...</p>
            </section>
        </div>
    )
}
