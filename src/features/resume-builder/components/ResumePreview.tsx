"use client";

import { ResumeOutput } from "../types";
import { Button } from "@/ui/Button";
import { Copy, Download, FileText, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/ui/Badge";

interface ResumePreviewProps {
    output: ResumeOutput;
    onDownload: () => void;
}

export function ResumePreview({ output, onDownload }: ResumePreviewProps) {
    const [copied, setCopied] = useState(false);
    const { content } = output;

    const copyToClipboard = () => {
        const text = `
${content.personal_info.name}
${content.personal_info.role}

SUMMARY
${content.summary}

SKILLS
${content.skills.join(", ")}

EXPERIENCE
${content.experience.map(exp => `${exp.position} at ${exp.company} (${exp.duration})`).join("\n")}

EDUCATION
${content.education.map(edu => `${edu.degree} from ${edu.institution} (${edu.year})`).join("\n")}
    `;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Resume Preview</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" onClick={onDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                </div>
            </div>

            <div className="aspect-[1/1.414] w-full overflow-hidden rounded-xl border border-border bg-white p-8 shadow-lg text-slate-800">
                <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-4">
                        <h1 className="text-3xl font-bold uppercase tracking-tighter text-slate-900">{content.personal_info.name}</h1>
                        <p className="text-lg font-medium text-slate-600">{content.personal_info.role}</p>
                    </div>

                    <section className="space-y-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">Professional Summary</h2>
                        <p className="text-sm leading-relaxed">{content.summary}</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">Key Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {content.skills.map(s => (
                                <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{s}</span>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">Experience</h2>
                        {content.experience.map((exp, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-slate-900">{exp.position}</h4>
                                    <span className="text-xs font-medium text-slate-500">{exp.duration}</span>
                                </div>
                                <p className="text-xs font-semibold text-slate-600 italic">{exp.company}</p>
                                <ul className="list-inside list-disc space-y-1">
                                    {exp.description.map((d, j) => (
                                        <li key={j} className="text-xs leading-normal">{d}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">Education</h2>
                        {content.education.map((edu, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                                    <p className="text-xs text-slate-600">{edu.institution}</p>
                                </div>
                                <span className="text-xs font-medium text-slate-500">{edu.year}</span>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}
