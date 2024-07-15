import IUser from "@/types/user";
import { ReactNode, useCallback, useRef, useState } from "react";
import { ArrowRightEndOnRectangleIcon, MoonIcon, DocumentIcon, CheckCircleIcon, BellAlertIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { signout } from "@/app/actions";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import Link from "next/link";
import { useTheme } from "@/lib/providers/theme";
import UserProfileImage from "./ui/UserProfileImage";


export default function UserProfile({ user }: { user: IUser }) {
    const [showDropdown, setShowDropdown] = useState(false)

    const closeDropdown = useCallback(() => setShowDropdown(false), [setShowDropdown])

    return (
        <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => setShowDropdown(prev => !prev)}>
                <UserProfileImage size={48} user={user} key="profile-image" />
                <ChevronDownIcon className={`size-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                <UserProfileDropdown user={user} show={showDropdown} close={closeDropdown} />
            </div>
        </div>
    )
}

function UserProfileDropdownItem({ children, onClick, href }: { children: ReactNode, onClick?: () => void, href?: string }) {
    const baseClassName = "px-3 py-2 hover:bg-tertiary-bg rounded cursor-pointer"

    if (href) {
        return <li className={baseClassName} onClick={onClick}>
            <Link href={href} className="flex gap-2 items-center">
                {children}
            </Link>
        </li>
    }

    return (
        <li className={`${baseClassName} flex gap-2 items-center`} onClick={onClick}>
            {children}
        </li>
    )
}


function UserProfileDropdown(
    { user, show, close }: { user: IUser, show: boolean, close: () => void }
) {
    const { theme, setTheme } = useTheme()

    const ref = useRef(null)
    useOutsideClick(ref, close)

    const onSignoutClick = async () => {
        await signout()
        close()
    }

    const onThemeClick = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    return (
        <div className={`${show ? "visible opacity-100" : "invisible opacity-0"} transition-all absolute top-[110%] space-y-4 right-0 bg-secondary-bg rounded drop-shadow w-max`} ref={ref}>
            {/* Header */}
            <div className="w-full px-6 pt-6 flex gap-2 items-center">
                <UserProfileImage user={user} key="profile-image" size={48} />
                <Link href="/me">
                    <p>{user.firstName}{" "}{user.lastName}</p>
                </Link>
            </div>
            {/* Content */}
            <ul className="space-y-2 w-full px-3 pb-6">
                <UserProfileDropdownItem onClick={onThemeClick}>
                    {
                        theme === "light" ?
                            <>
                                <MoonIcon className="size-6" />
                                Темная тема
                            </>
                            :
                            <>
                                <SunIcon className="size-6" />
                                Светлая тема
                            </>
                    }
                </UserProfileDropdownItem>
                <UserProfileDropdownItem href="/documents">
                    <DocumentIcon className="size-6" />
                    Документы
                </UserProfileDropdownItem>
                <UserProfileDropdownItem href="/me/#subscriptions">
                    <CheckCircleIcon className="size-6" />
                    Подписка
                </UserProfileDropdownItem>
                <UserProfileDropdownItem>
                    <BellAlertIcon className="size-6" />
                    Уведомления
                </UserProfileDropdownItem>
                <UserProfileDropdownItem onClick={onSignoutClick}>
                    <ArrowRightEndOnRectangleIcon className="size-6" />
                    Выйти
                </UserProfileDropdownItem>
            </ul>
        </div >
    )
}
