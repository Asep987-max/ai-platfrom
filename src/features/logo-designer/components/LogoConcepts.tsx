"use client";

import { LogoConcept } from "../types";
import { Button } from "@/ui/Button";
import { Download, Check, LayoutGrid } from "lucide-react";
import { useState } from "react";

interface LogoConceptsProps {
    concepts: LogoConcept[];
}

export function LogoConcepts({ concepts }: LogoConceptsProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-text-primary">Logo Concepts</h3>
                </div>
                <p className="text-sm text-text-muted">{concepts.length} unique designs generated</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {concepts.map((concept) => (
                    <div
                        key={concept.id}
                        onClick={() => setSelectedId(concept.id)}
                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all p-2 cursor-pointer ${selectedId === concept.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-surface hover:border-primary/50"
                            }`}
                    >
                        <div className="aspect-square relative overflow-hidden rounded-xl bg-white flex items-center justify-center p-8">
                            <img
                                src={concept.url}
                                alt={concept.description}
                                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                onError={(e: any) => {
                                    e.target.src = "https://placehold.co/512x512?text=Image+Load+Error";
                                    console.error("Image load failed");
                                }}
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {selectedId === concept.id && (
                                    <div className="bg-primary text-primary-foreground p-1 rounded-full animate-in zoom-in">
                                        <Check className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{concept.description}</p>
                            <Button size="sm" variant="outline" className="w-full h-8 text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Download className="mr-2 h-3 w-3" /> Download High Res
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
