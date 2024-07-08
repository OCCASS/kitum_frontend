import IUser from "@/types/user";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function UserProfileImage({ user, className }: { user: IUser, className?: string }) {
    return <Image
        src={user.avatar}
        alt={user.firstName.charAt(0) + user.lastName.charAt(0)}
        width="128"
        height="128"
        className={twMerge("rounded-full object-cover", className)}
    />
}
