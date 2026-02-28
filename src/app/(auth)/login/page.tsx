"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Lock, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                const data = await res.json();
                setError(data.error || "Authentication failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="flex flex-col items-center space-y-2">
                    <div className="rounded-2xl bg-primary/10 p-4">
                        <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-text-primary">Local Agent Hub</h1>
                    <p className="text-text-muted">Enter administrative password to proceed</p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6 rounded-3xl border border-border bg-surface p-8 shadow-xl">
                    <div className="space-y-4">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                            <Input
                                type="password"
                                placeholder="Admin Password"
                                className="pl-10 h-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="flex items-center space-x-2 rounded-lg bg-error/10 p-3 text-sm text-error">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                        {isLoading ? "Authenticating..." : (
                            <>
                                Unlock Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </form>

                <p className="text-xs text-text-muted uppercase tracking-widest mt-8">
                    Secured by Local Auth • Production Ready
                </p>
            </div>
        </div>
    );
}
