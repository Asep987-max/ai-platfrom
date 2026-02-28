import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                // This is a stub for real database authentication
                // In a real app, you would verify against postgres
                if (credentials.email === "user@example.com" && credentials.password === "password") {
                    return { id: "1", name: "John Doe", email: "user@example.com" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard") ||
                nextUrl.pathname.startsWith("/prompt-generator") ||
                nextUrl.pathname.startsWith("/resume-builder") ||
                nextUrl.pathname.startsWith("/logo-designer");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }
            return true;
        },
    },
});
