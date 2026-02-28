"use client";

import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { PromptInput } from "../types";

const templates: { title: string; description: string; category: string; config: Partial<PromptInput> }[] = [
    {
        title: "Authority Blog Post",
        description: "Deep dive educational content with an authoritative tone.",
        category: "Writing",
        config: {
            content_type: "Blog Post",
            tone: "Authoritative",
            conversion_goal: "Awareness",
        },
    },
    {
        title: "High-Conv Facebook Ad",
        description: "Persuasive ad copy designed for direct sales.",
        category: "Ads",
        config: {
            content_type: "Facebook Ad",
            tone: "Persuasive",
            platform: "Facebook",
            conversion_goal: "Direct Sale",
        },
    },
    {
        title: "Viral Twitter Thread",
        description: "Engaging and punchy thread structure for high retention.",
        category: "Social",
        config: {
            content_type: "Twitter/X Thread",
            tone: "Casual",
            platform: "Twitter/X",
            conversion_goal: "Engagement",
        },
    },
    {
        title: "Cold Outreach Email",
        description: "Professional yet empathetic email for lead generation.",
        category: "Email",
        config: {
            content_type: "Cold Email",
            tone: "Empathetic",
            platform: "Email",
            conversion_goal: "Lead Generation",
        },
    },
];

interface TemplateLibraryProps {
    onSelect: (config: Partial<PromptInput>) => void;
}

export function TemplateLibrary({ onSelect }: TemplateLibraryProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {templates.map((template, i) => (
                <div
                    key={i}
                    className="group rounded-lg border border-border bg-surface p-4 hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => onSelect(template.config)}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="w-fit text-[10px] uppercase tracking-wider">{template.category}</Badge>
                            <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">Use Template</span>
                            </Button>
                        </div>
                        <h4 className="font-semibold text-sm text-text-primary">{template.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{template.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
