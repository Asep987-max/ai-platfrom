"use client";

import { AlertCircle, XCircle, WifiOff, Timer, X } from "lucide-react";
import { Button } from "@/ui/Button";

interface ErrorLogProps {
    errors: { id: string; type: string; message: string; timestamp: string }[];
    onClear: () => void;
}

export function ErrorLog({ errors, onClear }: ErrorLogProps) {
    if (errors.length === 0) return null;

    return (
        <div className="mt-8 rounded-xl border border-error/20 bg-error/5 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-error">
                    <AlertCircle className="h-5 w-5" />
                    <h3 className="font-semibold">Error Log</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={onClear} className="text-error hover:bg-error/10">
                    <X className="h-4 w-4 mr-1" /> Clear Logs
                </Button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {errors.map((err) => (
                    <div key={err.id} className="flex gap-3 text-sm rounded-lg bg-white/50 p-3 border border-error/10">
                        <div className="mt-0.5">
                            {err.type === "NETWORK" && <WifiOff className="h-4 w-4 text-error" />}
                            {err.type === "TIMEOUT" && <Timer className="h-4 w-4 text-error" />}
                            {err.type === "API_ERROR" && <XCircle className="h-4 w-4 text-error" />}
                            {err.type === "MODEL_ERROR" && <AlertCircle className="h-4 w-4 text-error" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-xs uppercase tracking-wider text-error/70">{err.type.replace("_", " ")}</span>
                                <span className="text-[10px] text-text-muted">{err.timestamp}</span>
                            </div>
                            <p className="mt-1 text-text-primary leading-tight font-medium">{err.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
