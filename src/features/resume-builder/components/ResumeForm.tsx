"use client";

import { useResumeStore } from "../stores/useResumeStore";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Badge } from "@/ui/Badge";
import { Plus, Trash2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

interface ResumeFormProps {
    onSubmit: () => void;
}

export function ResumeForm({ onSubmit }: ResumeFormProps) {
    const { step, setStep, data, updateData, addExperience, removeExperience, addEducation, removeEducation } = useResumeStore();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${step >= s ? "border-primary bg-primary text-primary-foreground" : "border-border text-text-muted"
                            }`}>
                            {step > s ? <Check className="h-4 w-4" /> : s}
                        </div>
                        {s < 4 && <div className={`h-0.5 w-12 sm:w-24 ${step > s ? "bg-primary" : "bg-border"}`} />}
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                {step === 1 && <PersonalInfoStep data={data} updateData={updateData} onNext={nextStep} />}
                {step === 2 && <ExperienceStep data={data} addExperience={addExperience} removeExperience={removeExperience} onNext={nextStep} onPrev={prevStep} />}
                {step === 3 && <EducationStep data={data} addEducation={addEducation} removeEducation={removeEducation} onNext={nextStep} onPrev={prevStep} />}
                {step === 4 && <SkillsStep data={data} updateData={updateData} onSubmit={onSubmit} onPrev={prevStep} />}
            </div>
        </div>
    );
}

function PersonalInfoStep({ data, updateData, onNext }: any) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-sm text-text-muted">Let's start with your basic details.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                        value={data.full_name}
                        onChange={(e) => updateData({ full_name: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Target Role</label>
                    <Input
                        value={data.target_role}
                        onChange={(e) => updateData({ target_role: e.target.value })}
                        placeholder="Full Stack Developer"
                    />
                </div>
            </div>
            <Button onClick={onNext} className="w-full">Continue to Experience <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
    );
}

function ExperienceStep({ data, addExperience, removeExperience, onNext, onPrev }: any) {
    const [newExp, setNewExp] = useState({ company: "", position: "", duration: "", description: [""] });

    const handleAdd = () => {
        if (newExp.company && newExp.position) {
            addExperience(newExp);
            setNewExp({ company: "", position: "", duration: "", description: [""] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <p className="text-sm text-text-muted">Add your relevant career history.</p>
            </div>

            <div className="space-y-4">
                {data.experience.map((exp: any, i: number) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
                        <div>
                            <p className="font-semibold">{exp.position} @ {exp.company}</p>
                            <p className="text-xs text-text-muted">{exp.duration}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeExperience(i)}>
                            <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 rounded-lg border border-dashed border-border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} />
                    <Input placeholder="Position" value={newExp.position} onChange={e => setNewExp({ ...newExp, position: e.target.value })} />
                </div>
                <Input placeholder="Duration (e.g. 2020 - Present)" value={newExp.duration} onChange={e => setNewExp({ ...newExp, duration: e.target.value })} />
                <Button variant="outline" onClick={handleAdd} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onPrev} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={onNext} className="flex-1">Continue to Education <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
        </div>
    );
}

// EducationStep and SkillsStep omitted for brevity in this tool call, but follow the same pattern
function EducationStep({ data, addEducation, removeEducation, onNext, onPrev }: any) {
    const [newEdu, setNewEdu] = useState({ institution: "", degree: "", year: "" });

    const handleAdd = () => {
        if (newEdu.institution && newEdu.degree) {
            addEducation(newEdu);
            setNewEdu({ institution: "", degree: "", year: "" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Education</h2>
                <p className="text-sm text-text-muted">Where did you study?</p>
            </div>

            <div className="space-y-4">
                {data.education.map((edu: any, i: number) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
                        <div>
                            <p className="font-semibold">{edu.degree} @ {edu.institution}</p>
                            <p className="text-xs text-text-muted">{edu.year}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeEducation(i)}>
                            <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 rounded-lg border border-dashed border-border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Institution" value={newEdu.institution} onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })} />
                    <Input placeholder="Degree" value={newEdu.degree} onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} />
                </div>
                <Input placeholder="Graduation Year (e.g. 2018)" value={newEdu.year} onChange={e => setNewEdu({ ...newEdu, year: e.target.value })} />
                <Button variant="outline" onClick={handleAdd} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onPrev} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={onNext} className="flex-1">Continue to Skills <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
        </div>
    );
}

function SkillsStep({ data, updateData, onPrev, onSubmit }: any) {
    const [skill, setSkill] = useState("");

    const addSkill = () => {
        if (skill && !data.skills.includes(skill)) {
            updateData({ skills: [...data.skills, skill] });
            setSkill("");
        }
    };

    const removeSkill = (s: string) => {
        updateData({ skills: data.skills.filter((item: string) => item !== s) });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Skills & Expertise</h2>
                <p className="text-sm text-text-muted">Highlight your key strengths.</p>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="e.g. React, Python, Project Management"
                    value={skill}
                    onChange={e => setSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill()}
                />
                <Button variant="outline" onClick={addSkill}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[50px] p-4 rounded-lg border border-border bg-muted/10">
                {data.skills.length === 0 ? (
                    <p className="text-xs text-text-muted italic">No skills added yet.</p>
                ) : (
                    data.skills.map((s: string) => (
                        <Badge key={s} variant="secondary" className="pl-3 pr-2 py-1 gap-1">
                            {s}
                            <button onClick={() => removeSkill(s)} className="hover:text-error transition-colors">
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))
                )}
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
                <Button variant="outline" onClick={onPrev} className="flex-1"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={onSubmit} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Check className="mr-2 h-4 w-4" /> Generate AI Resume
                </Button>
            </div>
        </div>
    );
}
