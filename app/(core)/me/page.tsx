"use client"

import Input from "@/components/ui/Input"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { editUser } from "./actions"
import { useUser } from "@/lib/providers/user"
import SubmitButton from "@/components/ui/SubmitButton"
import Button from "@/components/ui/Button"
import { CameraIcon } from "@heroicons/react/24/outline"
import { postFormData } from "@/lib/fetch"
import IUser from "@/types/user"

export default function Me() {
    const { user, setUser } = useUser()
    const [state, action] = useFormState(editUser, { message: "", user: null })
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (state.user) setUser(state.user)
    }, [state, setUser])

    const onAvatarButtonClick = () => {
        fileInputRef?.current?.click()
    }

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("avatar", file)
        const { data, status } = await postFormData<IUser>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me/edit_avatar/`, formData)
        if (status === 201) setUser(data)
    }

    if (!user) return null

    return (
        <div className="space-y-5">
            <section className="space-y-8">
                <h1>Привет, {user.firstName} {user.lastName}</h1>
                <div className="relative inline-block">
                    <Image src={user.avatar} alt="Аватарка" width="100" height="100" className="rounded-full object-cover size-24" />
                    <Button variant="none" className="bg-gray-200 p-3 rounded-full absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3" onClick={onAvatarButtonClick}>
                        <CameraIcon className="size-5" strokeWidth="2" />
                        <Input type="file" className="hidden" innerRef={fileInputRef} onChange={onFileChange} accept="image/*" />
                    </Button>
                </div>
                <form action={action} className="flex gap-3 flex-col md:flex-row">
                    <div className="flex gap-3">
                        <Input placeholder="Имя" defaultValue={user?.firstName} className="flex-1" name="firstName" />
                        <Input placeholder="Фамилия" defaultValue={user?.lastName} className="flex-1" name="lastName" />
                    </div>
                    <SubmitButton>Изменить</SubmitButton>
                </form>
            </section>
            <section id="subscribtion">
                <h1 className="mb-5">Текущая подписка</h1>
                <p>Бла-бла-бла пока этой информации нет...</p>
            </section>
        </div>
    )
}
