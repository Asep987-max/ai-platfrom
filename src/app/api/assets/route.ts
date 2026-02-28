import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const dirPath = path.join(process.cwd(), "public", "marketplace-ready");

        if (!fs.existsSync(dirPath)) {
            return NextResponse.json({ assets: [] });
        }

        const files = fs.readdirSync(dirPath);
        const assets = files
            .filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg"))
            .map(file => {
                const stats = fs.statSync(path.join(dirPath, file));
                return {
                    id: file,
                    name: file,
                    url: `/marketplace-ready/${file}`,
                    createdAt: stats.birthtime.toISOString(),
                };
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({ assets });
    } catch (error) {
        return NextResponse.json({ error: "Failed to list assets" }, { status: 500 });
    }
}
