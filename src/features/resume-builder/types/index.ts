export interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string[];
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
}

export interface ResumeInput {
    full_name: string;
    target_role: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    template_variant: "modern" | "classic" | "minimal";
}

export interface ResumeOutput {
    content: {
        personal_info: { name: string; role: string };
        summary: string;
        skills: string[];
        experience: Experience[];
        education: Education[];
    };
    status: string;
}
