"use client";

import { useState } from "react";
import { Button } from "@/ui/Button";
import { PromptOutput } from "../types";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Badge } from "@/ui/Badge";

interface PromptOutputDisplayProps {
    output: PromptOutput;
    onRegenerate: () => void;
}

export function PromptOutputDisplay({ output, onRegenerate }: PromptOutputDisplayProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Generated Prompt</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onRegenerate}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Regenerate
                    </Button>
                    <Button size="sm" onClick={copyToClipboard}>
                        {copied ? (
                            <><Check className="mr-2 h-4 w-4" /> Copied</>
                        ) : (
                            <><Copy className="mr-2 h-4 w-4" /> Copy Prompt</>
                        )}
                    </Button>
                </div>
            </div>

            <div className="relative rounded-lg border border-border bg-surface p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary font-mono">
                    {output.prompt}
                </pre>
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-medium text-text-muted">Improve this prompt:</h4>
                <div className="flex flex-wrap gap-2">
                    {output.suggestions.map((suggestion, i) => (
                        <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                            {suggestion}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
