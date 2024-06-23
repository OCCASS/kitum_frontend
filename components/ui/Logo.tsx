type TLogoProps = {
    className?: string
}

const Logo = ({ className }: TLogoProps) => {
    return (
        <p className={`text-xl font-bold ${className}`}>KITUM</p>
    )
}

export default Logo;
