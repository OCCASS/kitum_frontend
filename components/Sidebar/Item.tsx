import React from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";

type TSidebarItemProps = {
    name: string
    path: string
    icon: { default: React.ReactNode, selected: React.ReactNode }
    close: () => void
}

export default function SidebarItem({ name, path, icon, close }: TSidebarItemProps) {
    const pathname = usePathname()
    const selected = path === pathname

    return (
        <li className={`px-3 py-2 ${selected ? "bg-bg_tertiary" : ""} hover:bg-bg_tertiary rounded`}>
            <Link
                href={path}
                className={`flex items-center gap-x-3.5`}
                onClick={close}
            >
                {selected ? icon.selected : icon.default}
                {name}
            </Link>
        </li>
    )

}
