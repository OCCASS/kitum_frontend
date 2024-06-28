"use client"

import Input from "@/components/ui/Input"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { editUser, editUserAvatar } from "./actions"
import { useUser } from "@/lib/providers/user"
import SubmitButton from "@/components/ui/SubmitButton"
import { CameraIcon } from "@heroicons/react/24/outline"
import Button from "@/components/ui/Button"

export default function Me() {
    const { user, setUser } = useUser()

    if (!user) return null

    return (
        <div className="space-y-8">
            <h1>Привет, {user.firstName} {user.lastName}</h1>
            <section className="flex items-center gap-10">
            </section>
            <EditUserAvatarForm />
            <section>
                <EditUserForm />
            </section>
            <section id="subscribtion">
                <h1 className="mb-5">Текущая подписка</h1>
                <p>Бла-бла-бла пока этой информации нет...</p>
            </section>
        </div>
    )
}

function EditUserForm() {
    const { user, setUser } = useUser()
    const [state, action] = useFormState(editUser, { message: "", user: null })

    useEffect(() => {
        if (state.user) setUser(state.user)
    }, [state, setUser])

    return (
        <form action={action} className="flex gap-3 flex-col md:flex-row">
            <div className="flex gap-3">
                <Input placeholder="Имя" defaultValue={user?.firstName} className="flex-1" name="firstName" />
                <Input placeholder="Фамилия" defaultValue={user?.lastName} className="flex-1" name="lastName" />
            </div>
            <SubmitButton>Изменить</SubmitButton>
        </form>
    )
}


function EditUserAvatarForm() {
    const { user, setUser } = useUser()
    const [editUserAvatarState, editUserAvatarAction] = useFormState(editUserAvatar, { message: "", user: null })
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editUserAvatarState.user) {
            setUser(editUserAvatarState.user)
            setFile(null)
        }
    }, [editUserAvatarState, setUser])

    const openFileInput = () => {
        fileInputRef?.current?.click()
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        setFile(file)
    }

    return (
        <>
            <div className="relative w-fit">
                <Image src={user?.avatar ?? ""} alt="Аватарка" width="100" height="100" className="rounded-full object-cover size-24" />
                <Button variant="none" className="bg-gray-200 p-3 rounded-full absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3" onClick={openFileInput}>
                    <CameraIcon className="size-5" strokeWidth="2" />
                </Button>
            </div>
            <form action={editUserAvatarAction}>
                <Input type="file" name="avatar" className="hidden" accept="image/*" innerRef={fileInputRef} onChange={onFileChange} />
                {file && <SubmitButton variant="outline" className="text-sm">Изменить</SubmitButton>}
            </form>
        </>
    )
}
