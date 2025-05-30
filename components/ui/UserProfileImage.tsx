import IUser from "@/types/user";
import Image from "next/image";

export default function UserProfileImage({ user, src, size = 128 }: { user: IUser, src?: string, size?: number }) {
    if (src)
        return <Image
            className="rounded-full"
            src={src}
            alt={`${user.firstName} ${user.lastName}`}
            width={size}
            height={size}
            priority
        />

    if (user.avatar)
        return <img
            className="rounded-full"
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            width={size}
            height={size}
        />


    return (
        <div style={{ width: size, height: size }} className={`bg-[#6c70f6] rounded-full relative`}>
            <span
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#121481]"
                style={{ fontSize: size * 0.3 }}
            >
                {user.firstName[0]} {user.lastName[0]}
            </span>
        </div>
    )
}
