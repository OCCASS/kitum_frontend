import Whale404Icon from "@/components/icons/Whale404Icon";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – 404 страница не найдена",
    description: "Страница не найдена"
}

export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-full">
            <div>
                <Whale404Icon className="m-auto w-full h-64 md:h-76 mb-5" />
                <h1 className="text-center text-gray-text mb-2">Страница не найдена</h1>
                <p className="text-center text-lg">Перейдите на <Link href="/" className="text-blue">главную</Link></p>
            </div>
        </div>
    )
}
