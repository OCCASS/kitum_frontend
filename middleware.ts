import { type NextRequest, NextResponse } from "next/server"
import { verifySessionFromRequest } from "./lib/session1"
import { deleteSession } from "./lib/session"

function addCors(res: NextResponse): NextResponse {
    res.headers.set("Access-Control-Allow-Credentials", "true")
    return res
}

function signinResponse(req: NextRequest): NextResponse {
    const response = NextResponse.redirect(
        new URL(
            `/signin?redirect_to=${encodeURIComponent(process.env.NEXT_PUBLIC_ROOT_URL + req.nextUrl.pathname)}`,
            req.nextUrl
        )
    )
    response.cookies.set("access", "", { maxAge: -1 })
    response.cookies.set("refresh", "", { maxAge: -1 })
    return addCors(response)
}

export default async function middleware(req: NextRequest) {
    const onlyPublicRoutes = ["/signin", "/signup", "/reset_password", "/reset_password/check", "/confirm_mail"]
    const publicRoutes = ["/favicon.ico", "/icon.ico", "/apple-icon.png"]
    const currentPath = req.nextUrl.pathname
    const isProtectedRoute = !([...onlyPublicRoutes, ...publicRoutes]).includes(currentPath)

    const { accessVerified, refreshVerified } = await verifySessionFromRequest(req)
    if (isProtectedRoute) {
        if (!accessVerified || !refreshVerified) {
            await deleteSession()
            return signinResponse(req)
        }

        return addCors(NextResponse.next())
    }

    if (onlyPublicRoutes.includes(currentPath) && accessVerified && refreshVerified) {
        return addCors(NextResponse.redirect(new URL("/", req.nextUrl)))
    }

    return addCors(NextResponse.next())
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image).*)"]
}
