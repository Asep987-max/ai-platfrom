import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const outputDir = path.join(process.cwd(), "public", "marketplace-ready");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const timestamp = Date.now();
        const filename = `output-${timestamp}.png`;
        const outputPath = path.join(outputDir, filename);

        // Construct the CLI command
        // Theoretical command: gemini "Research [prompt]. Then generate logo and save to [path]"
        const cliCommand = `Research 2026 design trends for: ${prompt}. Then, generate an image based on your research and save it to ${outputPath}`;

        console.log(`Executing Agent CLI: gemini "${cliCommand}"`);

        return await new Promise<NextResponse>((resolve) => {
            const child = spawn("gemini", [cliCommand], {
                shell: true,
                cwd: process.cwd(),
            });

            child.stdout.on("data", (data) => {
                console.log(`Agent Output: ${data}`);
            });

            child.stderr.on("data", (data) => {
                console.error(`Agent Error: ${data}`);
            });

            child.on("error", (error) => {
                console.error(`Agent spawn error: ${error.message}`);
                resolve(NextResponse.json({ error: `Agent spawn error: ${error.message}` }, { status: 500 }));
            });

            child.on("close", (code) => {
                if (code !== 0) {
                    console.error(`Agent exited with code ${code}`);
                    resolve(NextResponse.json({ error: `Agent failed with code ${code}` }, { status: 500 }));
                    return;
                }

                resolve(NextResponse.json({
                    success: true,
                    message: "Agent execution started",
                    asset: {
                        name: filename,
                        path: `/marketplace-ready/${filename}`,
                    }
                }));
            });
        });

    } catch (error) {
        console.error("CLI Execution Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
