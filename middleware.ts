import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/lib/session"
import { refresh } from "@/app/actions"

function signinResponse(req: NextRequest): NextResponse {
    const response = NextResponse.redirect(new URL(`/signin?redirect_to=${encodeURIComponent(req.url)}`, req.nextUrl))
    response.cookies.set("access", "", { maxAge: -1 })
    response.cookies.set("refresh", "", { maxAge: -1 })
    return response
}

export default async function middleware(req: NextRequest) {
    const publicRoutes = ["/signin", "/signup", "/reset_password", "/reset_password/check"]
    const currentPath = req.nextUrl.pathname
    const isProtectedRoute = !publicRoutes.includes(currentPath)

    if (isProtectedRoute) {
        const { accessVerified, refreshVerified } = await verifySession()
        if (!accessVerified || !refreshVerified) {
            return signinResponse(req)
        }

        if (!accessVerified && refreshVerified) {
            const tokens = await refresh()
            if (!tokens) return signinResponse(req)
            const response = NextResponse.next()
            response.cookies.set("access", tokens.access, { httpOnly: true, secure: true, path: "/" })
            response.cookies.set("refresh", tokens.refresh, { httpOnly: true, secure: true, path: "/" })
            return response
        }

        return NextResponse.next()
    }

    return NextResponse.next()
}

// Routes middleware should *not* run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image).*)"]
}
