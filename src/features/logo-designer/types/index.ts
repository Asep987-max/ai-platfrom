export interface LogoInput {
    company_name: string;
    industry: string;
    style_preference: string;
    color_palette: string[];
    slogan?: string;
}

export interface LogoConcept {
    id: string;
    url: string;
    description: string;
}

export interface LogoOutput {
    concepts: LogoConcept[];
    status: string;
    error?: {
        code: string;
        message: string;
        details?: string;
    };
}
