import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsLeftRight, MoreHorizontal, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">;
}

export default function MenuPage({ documentId }: MenuProps) {
    const archive = useMutation(api.document.archive);
    const { user } = useUser();
    const router = useRouter();

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (documentId) return;

        const promise = archive({ id: documentId }).then(() =>
            router.push("/documents"),
        );

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Archive document successfully",
            error: "Error archive document",
        });
    };

    return (
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreHorizontal size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col p-2">
                    <div
                        className="flex flex-row w-full gap-1 px-2 py-1 cursor-pointer hover:bg-neutral-400/30 justify-center items-center"
                        role="button"
                        onClick={onArchive}
                    >
                        <Trash size={20} />
                        <span>Delete</span>
                    </div>
                    <div className="border-t border-neutral-400/30">
                        Last seen {user?.fullName}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

MenuPage.Skleton = function menuSkleton() {
    return <Skeleton className="h-4 w-4" />;
};
