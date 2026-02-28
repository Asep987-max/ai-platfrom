"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { PromptInput } from "../types";

const promptSchema = z.object({
    content_type: z.string().min(1, "Required"),
    target_audience: z.string().min(1, "Required"),
    tone: z.string().min(1, "Required"),
    platform: z.string().min(1, "Required"),
    conversion_goal: z.string().min(1, "Required"),
    output_language: z.string().min(1, "Required"),
    additional_context: z.string().optional(),
});

interface PromptFormProps {
    onSubmit: (data: PromptInput) => void;
    isLoading: boolean;
    initialValues?: Partial<PromptInput>;
}

export function PromptForm({ onSubmit, isLoading, initialValues }: PromptFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PromptInput>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            content_type: "Blog Post",
            tone: "Professional",
            platform: "LinkedIn",
            conversion_goal: "Engagement",
            output_language: "English",
            ...initialValues,
        },
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                content_type: "Blog Post",
                tone: "Professional",
                platform: "LinkedIn",
                conversion_goal: "Engagement",
                output_language: "English",
                ...initialValues,
            });
        }
    }, [initialValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Content Type</label>
                    <select {...register("content_type")} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                        <option>Blog Post</option>
                        <option>Facebook Ad</option>
                        <option>Cold Email</option>
                        <option>Product Description</option>
                        <option>Twitter/X Thread</option>
                        <option>Video Script</option>
                        <option>SEO Article</option>
                        <option>Instagram Caption</option>
                        <option>Newsletter</option>
                        <option>Storytelling</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Target Audience</label>
                    <Input placeholder="e.g. SaaS Founders, Marketing Managers" {...register("target_audience")} />
                    {errors.target_audience && <p className="text-xs text-error">{errors.target_audience.message}</p>}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tone</label>
                    <select {...register("tone")} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Persuasive</option>
                        <option>Empathetic</option>
                        <option>Humorous</option>
                        <option>Authoritative</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <select {...register("platform")} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>LinkedIn</option>
                        <option>Twitter/X</option>
                        <option>TikTok</option>
                        <option>Google Ads</option>
                        <option>Email</option>
                        <option>Blog</option>
                        <option>YouTube</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Conversion Goal</label>
                    <select {...register("conversion_goal")} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                        <option>Awareness</option>
                        <option>Lead Generation</option>
                        <option>Direct Sale</option>
                        <option>Engagement</option>
                        <option>Retention</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Output Language</label>
                    <select {...register("output_language")} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                        <option value="English">English</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Additional Context (Optional)</label>
                <Textarea
                    placeholder="Mention specific topics, keywords, or constraints..."
                    className="min-h-[100px]"
                    {...register("additional_context")}
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Prompt"}
            </Button>
        </form>
    );
}
