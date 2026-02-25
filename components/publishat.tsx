import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, Copy, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface PublishProps {
    document: Doc<"documents">;
}

export default function PublishAt({ document }: PublishProps) {
    const updateDocuments = useMutation(api.document.updateFields);
    const [title, setTitle] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const url = `${process.env.NEXT_PUBLIC_URL}/preview/${document?._id}`;

    useEffect(() => {
        if (document?.title) {
            // @ts-ignore
            setTitle(document.title);
        }
    }, [document?.title]);

    if (!document) {
        return <Skeleton className="h-6 w-20 rounded-md" />;
    }

    const onCopied = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    const isPublished = () => {
        setIsLoading(true);

        const promise = updateDocuments({
            id: document._id,
            isPublished: false,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: "Publishing document...",
            success: "Published document",
            error: "Error publish document",
        });
    };

    const OnPublished = () => {
        setIsLoading(true);

        const promise = updateDocuments({
            id: document._id,
            isPublished: false,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: "Publishing document...",
            success: "Published document",
            error: "Error publish document",
        });
    };

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="cursor-pointer flex flex-row"
                    >
                        <span>Share</span>
                        <Globe className="text-blue-500" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full flex items-center justify-center">
                    {!document.isPublished ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center">
                                <Globe size={30} />
                            </div>
                            <p>Published is document</p>
                            <Button disabled={isLoading} onClick={isPublished}>
                                Publish
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-blue-500 flex flex-col items-center gap-1">
                                <Globe size={30} />
                                <p>This note is live web</p>
                            </div>
                            <div className="flex flex-row">
                                <Input
                                    className="rounded-none"
                                    value={url}
                                    disabled
                                    onClick={onCopied}
                                />
                                <Button className="w-8 h-6 rounded-none">
                                    {copied ? <Check /> : <Copy />}
                                </Button>
                            </div>
                            <div className="flex items-center justify-center">
                                <Button onClick={OnPublished}>
                                    OnPublished
                                </Button>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}
