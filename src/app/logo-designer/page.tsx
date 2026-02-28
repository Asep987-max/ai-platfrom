"use client";

import React from "react";
import { LogoForm } from "@/features/logo-designer/components/LogoForm";
import { LogoConcepts } from "@/features/logo-designer/components/LogoConcepts";
import { ErrorLog } from "@/features/logo-designer/components/ErrorLog";
import { useLogoDesigner } from "@/features/logo-designer/hooks/useLogoDesigner";
import { Sparkles, Palette } from "lucide-react";

export default function LogoDesignerPage() {
    const { generateLogo, isLoading, output, errorLog, clearErrors } = useLogoDesigner();

    return (
        <div className="container mx-auto max-w-7xl px-4 py-10">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">AI Logo Designer</h1>
                    <p className="mt-2 text-lg text-text-muted">Generate professional brand identities in seconds using AI.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Palette className="h-6 w-6" />
                </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-5">
                <div className="lg:col-span-2 space-y-8">
                    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" /> Create Your Brief
                        </h2>
                        <LogoForm onSubmit={generateLogo} isLoading={isLoading} />
                    </div>

                    <ErrorLog errors={errorLog} onClear={clearErrors} />
                </div>

                <div className="lg:col-span-3">
                    {output ? (
                        <LogoConcepts concepts={output.concepts} />
                    ) : (
                        <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/5 p-12 text-center">
                            <div className="mb-6 rounded-full bg-muted/20 p-6">
                                <Palette className="h-10 w-10 text-text-muted opacity-50" />
                            </div>
                            <h3 className="text-xl font-semibold text-text-primary">Ready to Design?</h3>
                            <p className="mt-2 max-w-sm text-text-muted">
                                Complete the form to generate unique logo concepts tailored to your brand's personality and industry.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
