import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hook/use-cover";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export default function Cover({ url, preview }: CoverProps) {
    const coverImage = useCoverImage();
    return (
        <div
            className={cn(
                "relative group w-full h-80",
                !url && "h-16",
                url && "text-muted",
            )}
        >
            {url ? (
                <Image src={url} fill alt="cover" className="object-cover" />
            ) : null}

            {url && !preview && (
                <div className="flex flex-row absolute bottom-5 right-30 gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                        variant={"ghost"}
                        className="text-white px-2 py-1 bg-primary/20"
                        onClick={() => coverImage.onOpen()}
                    >
                        <ImageIcon />
                        <span>Change cover</span>
                    </Button>

                    <Button
                        variant={"ghost"}
                        className="text-white px-2 py-1 bg-primary/20"
                    >
                        <X />
                        <span>Remove</span>
                    </Button>
                </div>
            )}
        </div>
    );
}
