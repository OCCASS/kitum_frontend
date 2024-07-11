import "@/app/globals.css";
import { Providers } from "@/app/providers";
import CookiesConset from "@/components/CookiesConset";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-screen">
            <body className="h-full bg-primary-bg text-primary-text relative">
                <Providers>
                    {children}
                </Providers>
                <CookiesConset />
            </body>
        </html>
    )

}
