"use client"

import { useTheme } from "@/lib/providers/theme"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

export default function ToggleTheme() {
    const { theme, setTheme } = useTheme()

    const onThemeClick = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }


    return (
        <div className="cursor-pointer" onClick={onThemeClick}>
            {
                theme === "light" ?
                    <>
                        <MoonIcon className="size-6" />
                    </>
                    :
                    <>
                        <SunIcon className="size-6" />
                    </>
            }
        </div>
    )
}
