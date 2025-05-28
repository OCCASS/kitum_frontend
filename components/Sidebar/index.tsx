import { useRef } from "react";
import SidebarItem from "./Item";
import { AcademicCapIcon, BookOpenIcon, CalendarDaysIcon, ChatBubbleLeftEllipsisIcon, CheckCircleIcon, DocumentDuplicateIcon, DocumentTextIcon, HomeIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon as AcademicCapIconSolid, CalendarDaysIcon as CalendarDaysIconSolid, ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid, DocumentDuplicateIcon as DocumentDuplicateIconSolid, DocumentTextIcon as DocumentTextIconSolid, HomeIcon as HomeIconSolid, BookOpenIcon as BookOpenIconSolid, CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import { useUser } from "@/lib/providers/user";

type ISidebarProps = {
    show: boolean
    close: () => void
}

const sidebarItems = [
    {
        name: "Главная",
        path: "/",
        icon: { default: <HomeIcon className="size-6" />, selected: <HomeIconSolid className="size-6" /> },
    },
    {
        name: "Уроки",
        path: "/lessons",
        icon: { default: <BookOpenIcon className="size-6" />, selected: <BookOpenIconSolid className="size-6" /> },
    },
    {
        name: "Домашняя работа",
        path: "/homework",
        icon: { default: <DocumentDuplicateIcon className="size-6" />, selected: <DocumentDuplicateIconSolid className="size-6" /> },
        isHomeworkPage: true
    },
    {
        name: "Расписание",
        path: "/schedule",
        icon: { default: <CalendarDaysIcon className="size-6" />, selected: <CalendarDaysIconSolid className="size-6" /> },
    },
    /*
    {
        name: "Подписки",
        path: "/subscriptions",
        icon: { default: <CheckCircleIcon className="size-6" />, selected: <CheckCircleIconSolid className="size-6" /> },
    },
    */
    {
        name: "Контакты",
        path: "/contacts",
        icon: { default: <ChatBubbleLeftEllipsisIcon className="size-6" />, selected: <ChatBubbleLeftEllipsisIconSolid className="size-6" /> },
    },
]

const Sidebar = ({ show, close }: ISidebarProps) => {
    const ref = useRef(null)
    const { user } = useUser()
    useOutsideClick(ref, close)

    let withHomeWork = false;
    if (user) withHomeWork = user.subscriptions.some(s => s.withHomeWork)

    return (
        <aside className={`${show ? "visible h-full " : "invisible h-0"} overflow-hidden transition-all duration-300 md:h-full md:visible md:transition-none w-full md:w-[256px] fixed top-header_height bottom-0 start-0 z-[60] end-auto shadow bg-secondary-bg`} ref={ref}>
            <nav className="pt-6 px-3 w-full flex flex-col flex-wrap">
                <ul className="space-y-1.5">
                    {
                        sidebarItems.filter(item => item?.isHomeworkPage ? withHomeWork : true).map((item, index) => <SidebarItem key={index} {...item} close={close} />)
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;
