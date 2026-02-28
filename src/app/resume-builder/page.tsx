"use client";

import { ResumeForm } from "@/features/resume-builder/components/ResumeForm";
import { ResumePreview } from "@/features/resume-builder/components/ResumePreview";
import { useResumeStore } from "@/features/resume-builder/stores/useResumeStore";
import { useState } from "react";
import { ResumeOutput } from "@/features/resume-builder/types";
import { Skeleton } from "@/ui/Skeleton";
import { AlertCircle, Wand2, FileText } from "lucide-react";

export default function ResumeBuilderPage() {
    const { data, step } = useResumeStore();
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState<ResumeOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to generate resume");

            const result = await response.json();
            setOutput(result);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!output) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/export/pdf`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(output),
            });

            if (!response.ok) throw new Error("Failed to export PDF");

            const { url } = await response.json();
            window.open(url, "_blank");
        } catch (err) {
            console.error("Export error:", err);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-10">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">AI Resume Builder</h1>
                    <p className="mt-2 text-lg text-text-muted">Create a professional, ATS-optimized resume in minutes.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Wand2 className="h-6 w-6" />
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-6">
                    <ResumeForm onSubmit={handleGenerate} />
                </div>

                <div className="lg:sticky lg:top-24 lg:h-fit">
                    {isLoading ? (
                        <div className="space-y-4 rounded-xl border border-border bg-surface p-8 shadow-sm">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <div className="aspect-[1/1.414] w-full rounded-lg bg-muted/20 animate-pulse" />
                        </div>
                    ) : output ? (
                        <ResumePreview output={output} onDownload={handleDownload} />
                    ) : (
                        <div className="flex aspect-[1/1.414] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/5 p-12 text-center">
                            <div className="mb-4 rounded-full bg-muted/20 p-4">
                                <FileText className="h-8 w-8 text-text-muted" />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">No Preview Yet</h3>
                            <p className="mt-2 text-sm text-text-muted">Fill in your details and click "Generate AI Resume" to see your optimized resume here.</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 flex items-center gap-3 rounded-lg border border-error/20 bg-error/10 p-4 text-error">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
