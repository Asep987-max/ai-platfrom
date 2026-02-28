import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || "default-secret-key-123");

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    const protectedPaths = ["/dashboard", "/prompt-generator", "/resume-builder", "/logo-designer", "/api/run-agent"];
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            await jwtVerify(token, SECRET);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect to dashboard if logged in and trying to access login page
    if (pathname === "/login" && token) {
        try {
            await jwtVerify(token, SECRET);
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } catch (err) {
            // Invalid token, allow access to login
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
