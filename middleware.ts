import { type NextRequest, NextResponse } from "next/server"
import { getTokenCookie, verifySession } from "@/lib/session"
import { refresh } from "@/app/actions"

function signinResponse(req: NextRequest): NextResponse {
    const response = NextResponse.redirect(new URL(`/signin?redirect_to=${encodeURIComponent(process.env.NEXT_PUBLIC_ROOT_URL + req.nextUrl.pathname)}`, req.nextUrl))
    response.cookies.set("access", "", { maxAge: -1 })
    response.cookies.set("refresh", "", { maxAge: -1 })
    return response
}

export default async function middleware(req: NextRequest) {
    const publicRoutes = ["/signin", "/signup", "/reset_password", "/reset_password/check", "/confirm_mail"]
    const currentPath = req.nextUrl.pathname
    const isProtectedRoute = !publicRoutes.includes(currentPath)

    if (isProtectedRoute) {
        const { accessVerified, refreshVerified } = verifySession()
        if (!accessVerified || !refreshVerified) {
            return signinResponse(req)
        }

        if (!accessVerified && refreshVerified) {
            const tokens = await refresh()
            if (!tokens) return signinResponse(req)
            try {
                const response = NextResponse.next()
                response.cookies.set("access", tokens.access, await getTokenCookie(tokens.access))
                response.cookies.set("refresh", tokens.refresh, await getTokenCookie(tokens.refresh))
                return response
            } catch {
                return signinResponse(req)
            }
        }

        return NextResponse.next()
    }

    return NextResponse.next()
}

// Routes middleware should *not* run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image).*)"]
}
