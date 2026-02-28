"use client";

import { useEffect, useRef } from "react";
import { Terminal, CheckCircle2, Circle, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogEntry {
    id: string;
    message: string;
    status: "pending" | "running" | "success" | "error";
    timestamp: string;
}

interface ActivityFeedProps {
    logs: LogEntry[];
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            >
                {logs.map((log) => (
                    <div key={log.id} className="flex space-x-3 text-sm animate-in fade-in slide-in-from-right-2 duration-300">
                        <div className="mt-0.5 shrink-0">
                            {log.status === "success" && <CheckCircle2 className="h-4 w-4 text-success" />}
                            {log.status === "running" && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                            {log.status === "pending" && <Circle className="h-4 w-4 text-text-muted" />}
                            {log.status === "error" && <AlertCircle className="h-4 w-4 text-error" />}
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className={cn(
                                "leading-relaxed",
                                log.status === "error" ? "text-error" : "text-text-primary",
                                log.status === "pending" && "text-text-muted"
                            )}>
                                {log.message}
                            </p>
                            <span className="text-[10px] text-text-muted font-mono">{log.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-[11px] text-text-muted uppercase tracking-tighter">
                    <span className="flex items-center font-bold">
                        <span className="mr-2 h-2 w-2 rounded-full bg-success animate-pulse" />
                        CLI Node Status: {logs.some(l => l.status === "running") ? "Active" : "Idle"}
                    </span>
                    <span>v1.2.0-beta</span>
                </div>
            </div>
        </div>
    );
}
