import { useRef } from "react";
import SidebarItem from "./SidebarItem";
import { AcademicCapIcon, CalendarDaysIcon, ChatBubbleLeftEllipsisIcon, DevicePhoneMobileIcon, DocumentDuplicateIcon, DocumentTextIcon, HomeIcon } from "@heroicons/react/24/outline";
import useOutsideClick from "@/lib/hooks/useOutsideClick";

type ISidebarProps = {
    show: boolean
    close: () => void
}

const sidebarItems = [
    { name: "Главная", path: "/", icon: <HomeIcon className="size-6" /> },
    { name: "Уроки", path: "/lessons", icon: <AcademicCapIcon className="size-6" /> },
    { name: "Домашняя работа", path: "/homework", icon: <DocumentDuplicateIcon className="size-6" />, },
    { name: "Варианты", path: "/variants", icon: <DocumentTextIcon className="size-6" /> },
    { name: "Расписание", path: "/schedule", icon: <CalendarDaysIcon className="size-6" /> },
    { name: "Reels", path: "/reels", icon: <DevicePhoneMobileIcon className="size-6" /> },
    { name: "Контакты", path: "/contacts", icon: <ChatBubbleLeftEllipsisIcon className="size-6" /> },
]

const Sidebar = ({ show, close }: ISidebarProps) => {
    const ref = useRef(null)
    useOutsideClick(ref, close)

    return (
        <aside className={`${show ? "visible h-full " : "invisible h-0"} overflow-hidden transition-all duration-300 md:h-full md:visible md:transition-none w-full md:w-[256px] fixed top-16 bottom-0 start-0 z-[60] end-auto shadow bg-bg_secondary`} ref={ref}>
            <nav className="pt-6 px-3 w-full flex flex-col flex-wrap">
                <ul className="space-y-1.5">
                    {sidebarItems.map((item, index) => <SidebarItem key={index} {...item} close={close} />)}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;
