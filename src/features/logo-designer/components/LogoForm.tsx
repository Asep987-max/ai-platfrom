"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { LogoInput } from "../types";
import { Sparkles } from "lucide-react";

const logoSchema = z.object({
    company_name: z.string().min(2, "Name must be at least 2 characters"),
    industry: z.string().min(2, "Please specify your industry"),
    style_preference: z.string().min(1, "Please select a style"),
    color_palette: z.string().transform((val) => val.split(",").map((s) => s.trim())),
    slogan: z.string().optional(),
});

interface LogoFormProps {
    onSubmit: (data: LogoInput) => void;
    isLoading: boolean;
}

export function LogoForm({ onSubmit, isLoading }: LogoFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: zodResolver(logoSchema),
        defaultValues: {
            style_preference: "Minimalist",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input {...register("company_name")} placeholder="e.g. Acme Tech" />
                    {errors.company_name && <p className="text-xs text-error">{errors.company_name.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Input {...register("industry")} placeholder="e.g. SaaS, Healthcare" />
                    {errors.industry && <p className="text-xs text-error">{errors.industry.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Style Preference</label>
                    <select
                        {...register("style_preference")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option>Minimalist</option>
                        <option>Retro / Vintage</option>
                        <option>Modern / Tech</option>
                        <option>Playful / Organic</option>
                        <option>Luxury / Elegant</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Color Palette (comma separated)</label>
                    <Input {...register("color_palette")} placeholder="e.g. #000000, #FFFFFF, Blue" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Slogan (Optional)</label>
                    <Input {...register("slogan")} placeholder="e.g. The future is here" />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Designing..." : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Generate Logo Concepts</>
                )}
            </Button>
        </form>
    );
}
