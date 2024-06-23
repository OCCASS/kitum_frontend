"use client"

import ThemeProvider from "@/lib/providers/theme"
import UserProvider from "@/lib/providers/user"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    )
}
