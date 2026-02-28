import { useState } from "react";
import { LogoInput, LogoOutput } from "../types";

export function useLogoDesigner() {
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState<LogoOutput | null>(null);
    const [errorLog, setErrorLog] = useState<{ id: string; type: string; message: string; timestamp: string }[]>([]);

    const addError = (type: string, message: string) => {
        const newError = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            message,
            timestamp: new Date().toLocaleTimeString(),
        };
        setErrorLog((prev) => [newError, ...prev]);
    };

    const generateLogo = async (input: LogoInput) => {
        setIsLoading(true);
        setOutput(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logo/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });

            if (!response.ok) {
                const errorData = await response.json();
                addError("API_ERROR", errorData.detail || "Failed to connect to the generation server.");
                throw new Error("Generation failed");
            }

            const result = await response.json();
            setOutput(result);
        } catch (err: any) {
            if (err.name === "AbortError") {
                addError("TIMEOUT", "The request took too long. Please try again.");
            } else if (!navigator.onLine) {
                addError("NETWORK", "You are offline. Please check your connection.");
            } else {
                addError("MODEL_ERROR", "The AI model was unable to process your request at this time.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { generateLogo, isLoading, output, errorLog, clearErrors: () => setErrorLog([]) };
}
