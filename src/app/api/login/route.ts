import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || "default-secret-key-123");

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password === (process.env.ADMIN_PASSWORD || "admin123")) {
            const token = await new SignJWT({ role: "admin" })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("24h")
                .sign(SECRET);

            const response = NextResponse.json({ success: true });

            response.cookies.set("auth-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            return response;
        }

        return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
