"use client";

import { useState, useEffect, useCallback } from "react";
import { CommandInput } from "@/features/dashboard/components/CommandInput";
import { ActivityFeed, LogEntry } from "@/features/dashboard/components/ActivityFeed";
import { GalleryGrid, ImageAsset } from "@/features/dashboard/components/GalleryGrid";
import { Sparkles, Activity, Package, Terminal } from "lucide-react";

export default function DashboardPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: "1", message: "Ready for local agent commands.", status: "success", timestamp: new Date().toLocaleTimeString() },
    ]);
    const [images, setImages] = useState<ImageAsset[]>([]);
    const [isGalleryLoading, setIsGalleryLoading] = useState(false);

    const addLog = (message: string, status: LogEntry["status"] = "running") => {
        setLogs((prev) => [
            ...prev,
            { id: Math.random().toString(), message, status, timestamp: new Date().toLocaleTimeString() },
        ]);
    };

    const fetchImages = useCallback(async () => {
        setIsGalleryLoading(true);
        try {
            const res = await fetch("/api/assets");
            const data = await res.json();
            if (data.assets) {
                setImages(data.assets);
            }
        } catch (err) {
            console.error("Failed to fetch assets", err);
        } finally {
            setIsGalleryLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleRunAgent = async (prompt: string) => {
        setIsRunning(true);
        addLog(`Initiating research for: "${prompt}"`, "running");

        try {
            const res = await fetch("/api/run-agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Agent failed to start");

            const data = await res.json();

            // Simulate CLI steps for UI feedback
            await new Promise(r => setTimeout(r, 1500));
            addLog("Trend analysis complete. Optimizing prompt...", "success");

            await new Promise(r => setTimeout(r, 2000));
            addLog(`Generating image via Nano Banana: ${data.asset.name}`, "running");

            await new Promise(r => setTimeout(r, 1500));
            addLog(`Asset saved to local marketplace-ready folder.`, "success");

            // Final success
            setIsRunning(false);
            fetchImages(); // Refresh gallery
        } catch (err) {
            addLog(`Error: ${err instanceof Error ? err.message : "CLI execution failed"}`, "error");
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                    <div className="rounded-xl bg-primary/20 p-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-text-primary">Command Center</h1>
                </div>
                <p className="text-xl text-text-muted max-w-2xl">
                    Execute local Gemini CLI commands to research, generate, and prepare assets for marketplace publishing.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-12">
                    {/* New Request Section */}
                    <section className="group rounded-[32px] border border-border bg-surface p-10 shadow-sm transition-all hover:shadow-xl hover:border-primary/20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black flex items-center">
                                <Activity className="mr-3 h-6 w-6 text-primary" />
                                New Agent Command
                            </h2>
                            {isRunning && (
                                <span className="flex items-center text-xs font-bold uppercase tracking-widest text-primary animate-pulse">
                                    Agent Processing...
                                </span>
                            )}
                        </div>
                        <CommandInput onSubmit={handleRunAgent} isRunning={isRunning} />
                    </section>

                    {/* Gallery Section */}
                    <section className="rounded-[32px] border border-border bg-surface p-10 shadow-sm">
                        <h2 className="text-2xl font-black mb-8 flex items-center">
                            <Package className="mr-3 h-6 w-6 text-accent" />
                            Production Workspace
                        </h2>
                        <GalleryGrid
                            images={images}
                            isLoading={isGalleryLoading}
                            onRefresh={fetchImages}
                        />
                    </section>
                </div>

                <aside className="lg:col-span-4">
                    <section className="sticky top-24 rounded-[32px] border border-border bg-surface p-10 shadow-sm h-[calc(100vh-140px)] min-h-[600px] flex flex-col transition-all hover:shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black flex items-center">
                                <Terminal className="mr-3 h-6 w-6 text-success" />
                                Agent Logs
                            </h2>
                            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        </div>
                        <ActivityFeed logs={logs} />
                    </section>
                </aside>
            </div>
        </div>
    );
}
