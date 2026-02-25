import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Search, Trash, Undo } from "lucide-react";
import ConfirmModal from "./modal/confirm-modal";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export default function TrashBox() {
    const documents = useQuery(api.document.getTrashDocument);
    const removeDocument = useMutation(api.document.removeDocument);
    const restore = useMutation(api.document.restore);

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const onRestore = (id: Id<"documents">) => {
        const promise = restore({ id });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Restored document!",
            error: "Failed to restore document",
        });
    };

    const onRemove = (docId: Id<"documents">) => {
        const promise = removeDocument({ id: docId });

        toast.promise(promise, {
            loading: "O'chirilmoqda...",
            success: "Hujjat butunlay o'chirildi!",
            error: "O'chirishda xatolik yuz berdi.",
        });
    };

    return (
        <div className="w-full hover:bg-neutral-500/30 py-1">
            <div className="ml-4">
                <Popover>
                    <PopoverTrigger className="flex flex-row gap-1 items-center cursor-pointer text-sm">
                        <Trash size={18} />
                        <span>Trash</span>
                    </PopoverTrigger>
                    <PopoverContent
                        side="bottom"
                        align="start"
                        className="w-80 z-100000"
                        alignOffset={11}
                        forceMount
                    >
                        <div className="flex items-center gap-x-1 p-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Nomi bo'yicha qidirish..."
                                className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                            />
                        </div>
                        <div className="mt-2 px-1 pb-1">
                            <p className="hidden last:block text-xs text-center dark:text-muted-foreground text-black pb-2">
                                Document not found
                            </p>
                            {documents?.map((item) => (
                                <div
                                    key={item._id}
                                    className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between p-2"
                                >
                                    <span className="truncate pl-2">
                                        {item.title}
                                    </span>
                                    <div className="flex items-center gap-x-1">
                                        <div
                                            role="button"
                                            className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                        >
                                            <Undo className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <ConfirmModal
                                            onConfirm={() => onRemove(item._id)}
                                        >
                                            <div
                                                role="button"
                                                className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                            >
                                                <Trash className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </ConfirmModal>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
