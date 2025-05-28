'use client'

import Button from "@/components/ui/Button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // TODO: test design
    return (
        <html lang="ru" className="h-dvh">
            <body className="h-full bg-primary-bg text-primary-text relative">
                <h2>Произошла ошибка!</h2>
                <Button variant="outline" onClick={() => reset()}>Попробовать еще раз</Button>
            </body>
        </html>
    )
}
