import Logo from "./ui/Logo";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import UserProfile from "./UserProfile";
import LinkButton from "./ui/LinkButton";
import { useUser } from "@/lib/providers/user";


type THeaderProps = {
    toggleSidebar: () => void
    showSidebar: boolean
}

export default function Header({ toggleSidebar, showSidebar }: THeaderProps) {
    const { user } = useUser()

    return (
        <header className="sticky h-header_height top-0 inset-x-0 flex z-[48] w-full py-2.5 sm:py-4 border-b border-primary-border-color  bg-secondary-bg">
            <nav className="w-full flex items-center ms-auto justify-between px-4 sm:px-6">
                <Logo />
                <div className="space-x-5 flex items-center">
                    {user ? <UserProfile user={user} /> : <LinkButton href="/signin">Login</LinkButton>}
                    {
                        showSidebar ?
                            <XMarkIcon onClick={toggleSidebar} className="size-6 cursor-pointer block md:hidden" /> :
                            <Bars2Icon onClick={toggleSidebar} className="size-6 cursor-pointer block md:hidden" />
                    }
                </div>
            </nav>
        </header >
    )
}
