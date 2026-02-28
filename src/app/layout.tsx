import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/layout/Header";
import { Sidebar } from "@/layout/Sidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "AI Tools Platform",
    description: "Production-ready AI SaaS Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dark">
            <body className={cn(inter.variable, "font-sans bg-bg text-text-primary")}>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <div className="flex flex-1">
                        <Sidebar />
                        <main className="flex-1 lg:pl-60">
                            <div className="container py-6">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
