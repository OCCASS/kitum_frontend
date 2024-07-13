import "@/app/globals.css";
import { Providers } from "@/app/providers";
import CookiesConset from "@/components/CookiesConset";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "KITUM – онлайн школа",
    description: "Онлайн школа подготвки ЕГЭ по информатике",
};

export const viewport: Viewport = {
    themeColor: "var(--bg-secondary);"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="h-dvh">
            <body className="h-full bg-primary-bg text-primary-text relative">
                <Providers>
                    {children}
                </Providers>
                <CookiesConset />
            </body>
        </html>
    )

}
