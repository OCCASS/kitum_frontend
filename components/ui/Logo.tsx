import logoIcon from "@/public/logo.svg"
import Image from "next/image"

type TLogoProps = {
    className?: string
}

const Logo = ({ className }: TLogoProps) => {
    return (
        <p className={`text-xl font-bold ${className} flex items-center gap-1`}>
            <Image priority src={logoIcon} alt="🐳" className="size-8" />
            KITUM
        </p>
    )
}

export default Logo;
