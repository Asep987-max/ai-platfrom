import Link from "next/link";
import { Button } from "@/ui/Button";
import { ArrowRight, Sparkles, Zap, Shield, Wand2, Palette, FileText } from "lucide-react";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-20 py-10">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary animate-in fade-in slide-in-from-top-4 duration-1000">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>The Future of AI Content Creation</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl">
                    Supercharge Your Workflow with <span className="text-primary italic">AI Precision</span>
                </h1>
                <p className="text-xl text-text-muted max-w-2xl">
                    Generate high-performance prompts, professional resumes, and stunning logos in seconds.
                    The all-in-one platform for modern builders and creators.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-lg font-medium text-white transition-colors hover:bg-primary/90 shadow-lg">
                        Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                        View Templates
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid gap-8 md:grid-cols-3">
                <FeatureCard
                    icon={<Wand2 className="h-8 w-8 text-primary" />}
                    title="Prompt Generator"
                    description="Engineered for specificity. Generate optimized prompts for Gemini, GPT-4, and Midjourney."
                    href="/prompt-generator"
                />
                <FeatureCard
                    icon={<FileText className="h-8 w-8 text-secondary" />}
                    title="AI Resume Builder"
                    description="ATS-optimized resumes that land interviews. Multi-step wizard with real-time AI suggestions."
                    href="/resume-builder"
                />
                <FeatureCard
                    icon={<Palette className="h-8 w-8 text-accent" />}
                    title="Logo Designer"
                    description="Vector-perfect brand identities. From minimalist to tech-forward, designed by Imagen 3."
                    href="/logo-designer"
                />
            </section>

            {/* Social Proof / Stats */}
            <section className="rounded-3xl bg-surface/50 border border-border p-12 text-center space-y-8">
                <h2 className="text-3xl font-bold">Trusted by 10,000+ Creators</h2>
                <div className="grid gap-8 sm:grid-cols-3">
                    <div>
                        <p className="text-4xl font-black text-primary">50k+</p>
                        <p className="text-text-muted">Prompts Generated</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-secondary">15k+</p>
                        <p className="text-text-muted">Resumes Built</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-accent">5k+</p>
                        <p className="text-text-muted">Logos Designed</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, href }: any) {
    return (
        <div className="group relative rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
            <div className="mb-6 inline-flex rounded-xl bg-muted/20 p-3 transition-colors group-hover:bg-primary/10">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-text-muted mb-6 leading-relaxed">{description}</p>
            <Link href={href} className="inline-flex items-center font-semibold text-primary group-hover:underline">
                Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    );
}
