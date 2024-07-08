import { twMerge } from "tailwind-merge"

const baseClassName = "bg-skeleton-bg animate-pulse rounded"

export function H1Skeleton({ className }: { className?: string }) {
    const cn = () => {
        return twMerge(baseClassName, "h-7 w-40", className)
    }

    return <div className={cn()}></div>
}

export function H2Skeleton({ className }: { className?: string }) {
    const cn = () => {
        return twMerge(baseClassName, "h-6 w-40", className)
    }

    return <div className={cn()}></div>
}

export function PSkeleton({ className }: { className?: string }) {
    const cn = () => {
        return twMerge(baseClassName, "h-3 w-40", className)
    }

    return <div className={cn()}></div>
}

export function ButtonSkeleton({ className }: { className?: string }) {
    const cn = () => {
        return twMerge(baseClassName, "h-10 w-[100px]", className)
    }

    return <div className={cn()}></div>
}

