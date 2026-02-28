"use client";

import { Download, Clipboard, ImageIcon, RefreshCcw, Calendar } from "lucide-react";
import { Button } from "@/ui/Button";

export interface ImageAsset {
    id: string;
    name: string;
    url: string;
    createdAt: string;
}

interface GalleryGridProps {
    images: ImageAsset[];
    isLoading: boolean;
    onRefresh: () => void;
}

export function GalleryGrid({ images, isLoading, onRefresh }: GalleryGridProps) {
    const handleDownload = (img: ImageAsset) => {
        const link = document.createElement("a");
        link.href = img.url;
        link.download = img.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopy = async (img: ImageAsset) => {
        try {
            const response = await fetch(img.url);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                }),
            ]);
            alert("Image copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy image", err);
            alert("Failed to copy image to clipboard.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted">{images.length} Assets in Local Repository</span>
                <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isLoading} className="rounded-full h-8 px-3">
                    <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {images.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border rounded-3xl bg-muted/5">
                    <div className="rounded-full bg-muted/20 p-6 mb-6">
                        <ImageIcon className="h-12 w-12 text-text-muted opacity-50" />
                    </div>
                    <p className="text-xl font-bold text-text-primary mb-2">No assets found</p>
                    <p className="text-text-muted max-w-xs text-center">Execute a CLI command to generate images in your local marketplace-ready folder.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-4">
                    {images.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-3xl border border-border bg-bg overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-primary/30">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

                            <div className="w-full h-full flex items-center justify-center bg-muted/10">
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as any).src = "https://placehold.co/400x400/1e293b/white?text=Asset+Processing";
                                        (e.target as any).className = "w-full h-full object-center opacity-50 grayscale";
                                    }}
                                />
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="flex flex-col space-y-1 mb-4">
                                    <p className="text-white text-lg font-bold truncate leading-tight">{img.name}</p>
                                    <div className="flex items-center text-white/60 text-xs">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(img.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-white text-black hover:bg-gray-200 font-bold rounded-xl shadow-lg"
                                        onClick={() => handleDownload(img)}
                                    >
                                        <Download className="h-4 w-4 mr-2" /> Download
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-white border-white/30 hover:bg-white/10 px-3 rounded-xl backdrop-blur-sm"
                                        onClick={() => handleCopy(img)}
                                    >
                                        <Clipboard className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
