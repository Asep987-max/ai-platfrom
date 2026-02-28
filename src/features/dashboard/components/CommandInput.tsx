"use client";

import { useState } from "react";
import { Button } from "@/ui/Button";
import { Textarea } from "@/ui/Textarea";
import { Send, Terminal, Sparkles, Loader2 } from "lucide-react";

interface CommandInputProps {
    onSubmit: (prompt: string) => Promise<void>;
    isRunning: boolean;
}

export function CommandInput({ onSubmit, isRunning }: CommandInputProps) {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isRunning) return;
        await onSubmit(prompt);
        setPrompt(""); // Clear after submission
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur transition duration-500 group-focus-within:opacity-100" />
                <Textarea
                    placeholder="e.g., Research current logo trends and generate a minimalist vector logo..."
                    className="min-h-[160px] resize-none rounded-2xl border-border bg-bg/50 p-6 text-lg leading-relaxed focus:ring-primary/50 relative z-10"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-text-muted" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Gemini CLI Agent Ready</span>
                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isRunning || !prompt.trim()}
                >
                    {isRunning ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Agent Executing...
                        </>
                    ) : (
                        <>
                            Execute Command <Send className="ml-2 h-5 w-5" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
