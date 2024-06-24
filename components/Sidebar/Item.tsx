import React from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";

type TSidebarItemProps = {
    name: string
    path: string
    icon: React.ReactNode
    close: () => void
}

export default function SidebarItem({ name, path, icon, close }: TSidebarItemProps) {
    const pathname = usePathname()

    return (
        <li className={`px-3 py-2 ${path === pathname ? "bg-bg_tertiary" : ""} hover:bg-bg_tertiary rounded`}>
            <Link
                href={path}
                className={`flex items-center gap-x-3.5`}
                onClick={close}
            >
                {icon}
                {name}
            </Link>
        </li>
    )

}
