"use client"

import { ThemeType } from "@/types/theme"
import { useContext, useEffect, useState } from "react"
import ThemeContext from "@/lib/context/theme"


function loadTheme(): ThemeType {
    return (typeof window !== "undefined" && localStorage.getItem("theme") as ThemeType) || "dark"
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(loadTheme)

    useEffect(() => {
        typeof window !== "undefined" && localStorage.setItem("theme", theme)
        const htmlElement = document.body.parentNode as HTMLElement
        if (theme === "light") htmlElement?.classList?.remove("dark")
        else htmlElement?.classList?.add("dark")
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme has to be used within ThemeProvider")
    }
    return context
}
