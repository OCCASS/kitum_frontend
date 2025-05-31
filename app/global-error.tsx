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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-3 max-w-4xl w-full px-5">
                    <h2>Произошла ошибка!</h2>
                    <p>Попробуйте перезагрузить страницу. Если ничего не помогает – обратитесь в поддержку</p>
                    <Button variant="outline" onClick={() => reset()}>Попробовать еще раз</Button>
                </div>
            </body>
        </html>
    )
}
