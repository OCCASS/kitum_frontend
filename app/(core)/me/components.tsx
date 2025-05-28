"use client"

import { useUser } from "@/lib/providers/user"
import { editUser, editUserAvatar } from "./actions"
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react"
import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton"
import Button from "@/components/ui/Button"
import { CameraIcon } from "@heroicons/react/24/outline"
import UserProfileImage from "@/components/ui/UserProfileImage"
import { formattedDate } from "@/utils/date";
import LoadingView from "@/components/LoadingView";
import { PSkeleton } from "@/components/Skeleton";
import DateInput from "@/components/ui/DateInput";
import IUserSubscription from "@/types/user_subscription"

export function Greeting() {
    const { user } = useUser()
    if (!user) return (
        <div className="flex items-center gap-3">
            <h1>Привет, </h1>
            <PSkeleton className="h-8" />
            <PSkeleton className="h-8" />
        </div>
    )
    return (<h1>Привет, {user.firstName} {user.lastName}</h1>)
}

export function Subscriptions() {
    const { user } = useUser()

    if (!user) return <LoadingView />
    if (user.subscriptions.length === 0) return <p className="text-center text-gray-500">У вас нет подписок!</p>

    return (
        <div className="space-y-2">
            {
                user.subscriptions.map((item: IUserSubscription) => {
                    const expiresAt: Date = new Date(Date.parse(item.expiresAt))
                    return (
                        <article key={item.id} className="card flex flex-col md:flex-row gap-3 justify-between items-start md:items-center min-h-0">
                            <div className="h-full space-y-3">
                                <h2>{item.title}</h2>
                                <p className="text-gray-500">Активна до: {formattedDate(expiresAt)}</p>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export function EditUserForm() {
    const { user, setUser } = useUser()
    const [state, action] = useActionState(editUser, { message: "", user: null })

    useEffect(() => {
        if (state.user) setUser(state.user)
    }, [state, setUser])

    return (
        <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Имя" defaultValue={user?.firstName} name="firstName" />
            <Input placeholder="Фамилия" defaultValue={user?.lastName} name="lastName" />
            <DateInput name="birthday" initialDate={user?.birthday ? new Date(user.birthday) : null} />
            <Input placeholder="Email" defaultValue={user?.email} disabled />
            <SubmitButton className="md:col-span-2">Изменить</SubmitButton>
        </form>
    )
}

export function EditUserAvatarForm() {
    const { user, setUser } = useUser()
    const [editUserAvatarState, editUserAvatarAction] = useActionState(editUserAvatar, { message: "", user: null })
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

    if (!user) return <LoadingView />

    return (
        <>
            <div className="relative w-fit">
                <UserProfileImage
                    user={user}
                    src={image ?? ""}
                    size={96}
                />
                <Button variant="none"
                    className="bg-camera-button-bg p-3 rounded-full absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3"
                    onClick={openFileInput}>
                    <CameraIcon className="size-5" strokeWidth="2" />
                </Button>
            </div>
            <form action={editUserAvatarAction}>
                <Input type="file" name="avatar" className="hidden" accept="image/*" innerRef={fileInputRef}
                    onChange={onFileChange} />
                {
                    file && <div className="flex flex-col md:flex-row gap-2">
                        <SubmitButton variant="outline" className="text-sm">Изменить</SubmitButton>
                        <Button className="text-sm" onClick={reset}>Отменить</Button>
                    </div>
                }
            </form>
        </>
    )
}
