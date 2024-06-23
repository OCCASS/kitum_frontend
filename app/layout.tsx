import "@/app/globals.css";
import { Providers } from "@/app/providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-screen">
            <body className="h-full bg-bg_primary text-text_primary">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )

}
