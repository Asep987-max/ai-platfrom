"use client";

import { useState } from "react";
import { PromptForm } from "@/features/prompt-generator/components/PromptForm";
import { PromptOutputDisplay } from "@/features/prompt-generator/components/PromptOutputDisplay";
import { TemplateLibrary } from "@/features/prompt-generator/components/TemplateLibrary";
import { usePromptGenerator } from "@/features/prompt-generator/hooks/usePromptGenerator";
import { Skeleton } from "@/ui/Skeleton";
import { Badge } from "@/ui/Badge";
import { Terminal } from "lucide-react";
import { PromptInput } from "@/features/prompt-generator/types";

export default function PromptGeneratorPage() {
    const { generate, isLoading, output, error } = usePromptGenerator();
    const [templateConfig, setTemplateConfig] = useState<Partial<PromptInput> | null>(null);

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col gap-2 text-center items-center">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <Terminal className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-text-primary">AI Prompt Generator</h1>
                <p className="text-text-muted max-w-xl">Create professional instructions for AI models to get the best possible results.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
                <div className="space-y-8">
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                            <Badge className="rounded-full h-6 w-6 flex items-center justify-center p-0">1</Badge>
                            Pick a Template
                        </h2>
                        <TemplateLibrary onSelect={(config) => setTemplateConfig(config)} />
                    </section>

                    <section className="rounded-xl border border-border bg-surface p-8 space-y-6">
                        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                            <Badge className="rounded-full h-6 w-6 flex items-center justify-center p-0">2</Badge>
                            Customize Configuration
                        </h2>
                        <PromptForm
                            onSubmit={generate}
                            isLoading={isLoading}
                            initialValues={templateConfig || undefined}
                        />
                    </section>
                </div>

                <div className="space-y-8 sticky top-24">
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                            <Badge className="rounded-full h-6 w-6 flex items-center justify-center p-0">3</Badge>
                            Generated Result
                        </h2>

                        <div className="min-h-[400px] flex flex-col">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-64 w-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                </div>
                            ) : output ? (
                                <PromptOutputDisplay output={output} onRegenerate={() => { }} />
                            ) : (
                                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center bg-surface/30">
                                    <div className="rounded-full bg-surface p-4 mb-4 shadow-sm">
                                        <Terminal className="h-10 w-10 text-text-muted" />
                                    </div>
                                    <h3 className="font-semibold text-text-primary">No prompt yet</h3>
                                    <p className="text-sm text-text-muted mt-2">Generate a prompt or pick a template to get started.</p>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 rounded-md bg-error/10 p-4 border border-error/20">
                                    <p className="text-sm text-error font-medium">{error}</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
