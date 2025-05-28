export async function refreshTokens(body: { refresh?: string, access?: string } = {}) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/refresh`,
        {
            method: "POST",
            body: JSON.stringify(body),
            cache: "no-store"
        }
    )
    if (!response.ok) return null

    const tokens = await response.json()
    return tokens
}
