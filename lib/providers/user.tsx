"use client"

import IUser from "@/types/user";
import UserContext from "@/lib/context/user";
import { useContext, useEffect, useState } from "react";
import { get } from "@/lib/fetch";

const getUser = async () => {
    const { data, status } = await get<IUser>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me/`)
    if (status === 200) return data
    return null
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        (async () => {
            setUser(await getUser())
        })()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser has to be used within UserProvider")
    }
    return context
}
