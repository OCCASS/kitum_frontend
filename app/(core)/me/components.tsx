"use client"

import { useUser } from "@/lib/providers/user"
import { useFormState, useFormStatus } from "react-dom"
import { editUser, editUserAvatar } from "./actions"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton"
import Button from "@/components/ui/Button"
import { CameraIcon } from "@heroicons/react/24/outline"
import UserProfileImage from "@/components/ui/UserProfileImage"

export function Greeting() {
    const { user } = useUser()
    return (<h1>Привет, {user?.firstName} {user?.lastName}</h1>)
}

export function EditUserForm() {
    const { user, setUser } = useUser()
    const [state, action] = useFormState(editUser, { message: "", user: null })

    useEffect(() => {
        if (state.user) setUser(state.user)
    }, [state, setUser])

    return (
        <form action={action} className="flex gap-3 flex-col md:flex-row">
            <div className="flex gap-2 md:gap-3 flex-col md:flex-row">
                <Input placeholder="Имя" defaultValue={user?.firstName} className="flex-1" name="firstName" />
                <Input placeholder="Фамилия" defaultValue={user?.lastName} className="flex-1" name="lastName" />
            </div>
            <SubmitButton>Изменить</SubmitButton>
        </form>
    )
}

export function EditUserAvatarForm() {
    const { user, setUser } = useUser()
    const [editUserAvatarState, editUserAvatarAction] = useFormState(editUserAvatar, { message: "", user: null })
    const [file, setFile] = useState<File | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editUserAvatarState.user) {
            setUser(editUserAvatarState.user)
            reset()
        }
    }, [editUserAvatarState, setUser])

    const openFileInput = () => {
        fileInputRef?.current?.click()
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        setFile(file)
        setImage(URL.createObjectURL(file))
    }

    const reset = () => {
        setFile(null)
        setImage(null)
    }

    if (!user) return "Loading..."

    return (
        <>
            <div className="relative w-fit">
                <UserProfileImage user={user} src={image ?? ""} className="size-24" />
                <Button variant="none" className="bg-camera-button-bg p-3 rounded-full absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3" onClick={openFileInput}>
                    <CameraIcon className="size-5" strokeWidth="2" />
                </Button>
            </div>
            <form action={editUserAvatarAction}>
                <Input type="file" name="avatar" className="hidden" accept="image/*" innerRef={fileInputRef} onChange={onFileChange} />
                {file && <SubmitButton variant="outline" className="text-sm mr-3">Изменить</SubmitButton>}
                {file && <Button className="text-sm" onClick={reset}>Отменить</Button>}
            </form>
        </>
    )
}
