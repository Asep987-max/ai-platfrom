import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary p-1">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tight">AI HUB</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:text-primary">Admin Access</Link>
                </div>
            </div>
        </header>
    );
}
