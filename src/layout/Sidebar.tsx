import Link from "next/link";
import { LayoutDashboard, FileText, Palette, Wand2 } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-60 border-r border-border bg-surface lg:block">
            <nav className="flex flex-col gap-2 p-4">
                <SidebarLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
                <SidebarLink href="/prompt-generator" icon={<Wand2 className="h-5 w-5" />} label="Prompt Gen" />
                <SidebarLink href="/resume-builder" icon={<FileText className="h-5 w-5" />} label="Resume Build" />
                <SidebarLink href="/logo-designer" icon={<Palette className="h-5 w-5" />} label="Logo Design" />
            </nav>
        </aside>
    );
}

function SidebarLink({ href, icon, label }: any) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
        >
            {icon}
            {label}
        </Link>
    );
}
