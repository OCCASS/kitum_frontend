import Layout from "@/components/Layout";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout>
            <div className="m-auto h-full max-w-[1200px] p-4 sm:p-6 overflow-auto">
                {children}
            </div>
        </Layout>
    );
}
