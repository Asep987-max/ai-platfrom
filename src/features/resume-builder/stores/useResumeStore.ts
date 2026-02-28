import { create } from "zustand";
import { ResumeInput, Experience, Education } from "../types";

interface ResumeState {
    step: number;
    data: ResumeInput;
    setStep: (step: number) => void;
    updateData: (data: Partial<ResumeInput>) => void;
    addExperience: (exp: Experience) => void;
    removeExperience: (index: number) => void;
    addEducation: (edu: Education) => void;
    removeEducation: (index: number) => void;
    reset: () => void;
}

const initialData: ResumeInput = {
    full_name: "",
    target_role: "",
    skills: [],
    experience: [],
    education: [],
    template_variant: "modern",
};

export const useResumeStore = create<ResumeState>((set) => ({
    step: 1,
    data: initialData,
    setStep: (step) => set({ step }),
    updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
    addExperience: (exp) => set((state) => ({
        data: { ...state.data, experience: [...state.data.experience, exp] }
    })),
    removeExperience: (index) => set((state) => ({
        data: { ...state.data, experience: state.data.experience.filter((_, i) => i !== index) }
    })),
    addEducation: (edu) => set((state) => ({
        data: { ...state.data, education: [...state.data.education, edu] }
    })),
    removeEducation: (index) => set((state) => ({
        data: { ...state.data, education: state.data.education.filter((_, i) => i !== index) }
    })),
    reset: () => set({ step: 1, data: initialData }),
}));
