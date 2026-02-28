import { useState } from "react";
import { PromptInput, PromptOutput } from "../types";

export function usePromptGenerator() {
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState<PromptOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generate = async (input: PromptInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/prompt/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            if (!response.ok) {
                throw new Error("Failed to generate prompt");
            }

            const data = await response.json();
            setOutput(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        generate,
        isLoading,
        output,
        error,
        reset: () => setOutput(null),
    };
}
