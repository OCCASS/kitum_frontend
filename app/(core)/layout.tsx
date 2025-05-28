import Layout from "@/components/Layout";
import { NuqsAdapter } from "nuqs/adapters/next";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            <Layout>
                <div className="m-auto h-full max-w-[1200px] p-4 sm:p-6 overflow-auto">
                    {children}
                </div>
            </Layout>
        </NuqsAdapter>
    );
}
