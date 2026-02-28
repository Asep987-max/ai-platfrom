export type ContentType =
    | "Blog Post"
    | "Facebook Ad"
    | "Cold Email"
    | "Product Description"
    | "Twitter/X Thread"
    | "Video Script"
    | "SEO Article"
    | "Instagram Caption"
    | "Newsletter"
    | "Storytelling";

export type Tone =
    | "Professional"
    | "Casual"
    | "Persuasive"
    | "Empathetic"
    | "Humorous"
    | "Authoritative";

export type Platform =
    | "Facebook"
    | "Instagram"
    | "LinkedIn"
    | "Twitter/X"
    | "TikTok"
    | "Google Ads"
    | "Email"
    | "Blog"
    | "YouTube";

export type ConversionGoal =
    | "Awareness"
    | "Lead Generation"
    | "Direct Sale"
    | "Engagement"
    | "Retention";

export type Language = "Bahasa Indonesia" | "English";

export interface PromptInput {
    content_type: ContentType;
    target_audience: string;
    tone: Tone;
    platform: Platform;
    conversion_goal: ConversionGoal;
    output_language: Language;
    additional_context?: string;
}

export interface PromptOutput {
    prompt: string;
    meta: {
        model: string;
        timestamp: string;
    };
    suggestions: string[];
}
