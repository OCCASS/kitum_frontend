import { M_PLUS_Rounded_1c } from "next/font/google"

type TLogoProps = {
    className?: string
}

const font = M_PLUS_Rounded_1c({ subsets: ["latin"], weight: "700" })

const Logo = ({ className }: TLogoProps) => {
    return (
        <p className={`text-xl font-bold ${className} flex items-center gap-2`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 105 60"
                className="size-8"
            >
                <path
                    fill="#347aff"
                    d="M102.05 24.73c-1.82 1.56-3.83 2.72-5.85 4.08-1.21.88-1.31 1.46-1.61 2.82-.3 1.36-.71 2.72-1.21 4.08-1.61 4.28-4.04 8.17-7.47 11.28-8.17 7.58-20.59 11.28-31.59 12.54-5.35.58-10.8.49-16.15.39-4.24-.1-8.38-.49-12.51-1.36C17.69 57 9.71 53.6 4.87 47.09c-5.76-7.68-6.06-19.15-2.73-27.8C6.08 8.88 15.16 2.47 26.26.42c12.31-2.24 24.83 4.67 32.09 14 2.83 3.6 4.74 7.68 7.06 11.57 2.42 3.99 5.15 8.26 9.69 10.31 2.02.88 3.53.78 5.25-.58 1.21-.97 2.32-2.33 2.72-3.89.81-2.82-1.21-3.99-3.43-5.06-3.73-1.65-6.46-3.4-6.46-7.78 0-4.86 3.83-7.58 8.68-7.19 3.53.29 6.36 2.14 7.67 5.06 2.72-2.82 7.47-3.6 11.3-2.14 1.82.68 3.53 1.94 4.04 3.89.61 2.33-1.11 4.57-2.83 6.13z"
                ></path>
            </svg>
            <span className={font.className}>KITUM</span>
        </p>
    )
}

export default Logo;
