import ToggleTheme from "@/components/ToggleTheme";
import Logo from "@/components/ui/Logo";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="h-header_height flex items-center justify-between w-full py-2.5 sm:py-4 border-b border-primary-border-color bg-secondary-bg px-4 sm:px-6">
                <Logo />
                <ToggleTheme />
            </header>
            <main className="w-full h-full-without-header p-3 flex items-center justify-center">
                <div className="w-full" style={{ maxWidth: "500px", alignSelf: "safe center" }}>
                    {children}
                </div>
            </main>
        </>
    );
}
