"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/hook/use-sidebar";

interface ItemProps {
    id?: Id<"documents">;
    label: string;
    level?: number;
    onExpand?: () => void;
    onClick?: () => void;
    icon?: LucideIcon; // Mana shu yerda LucideIcon turi berildi
    expanded?: boolean;
    active?: boolean;
    isSearch?: boolean;
    isSetting?: boolean;
    documentIcon?: string;
}

export default function Item({
    label,
    id,
    level,
    onExpand,
    expanded,
    icon: Icon, // Icon sifatida qabul qilinmoqda
    onClick,
    active,
    isSearch,
    isSetting,
    documentIcon,
}: ItemProps) {
    const { user } = useUser();
    const router = useRouter();
    const sidebar = useSidebar();

    const createDocument = useMutation(api.document.createDocument);
    const archive = useMutation(api.document.archive);

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archive({ id }).then(() => router.push("/documents"));

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Archive document successfully",
            error: "Error archive document",
        });
    };

    const onCreateDocument = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        if (!id) return;

        const promise = createDocument({
            title: "Untitled",
            parentDocument: id,
        }).then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
            if (window.innerWidth < 768) {
                sidebar.onCollapse();
            }
        });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Create document successfully",
            error: "Error create document",
        });
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const handleItemClick = () => {
        onClick?.();
        if (window.innerWidth < 768) {
            sidebar.onCollapse();
        }
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            className={cn(
                "group hover:bg-neutral-400/30 cursor-pointer transition-all ease-in-out duration-200 flex justify-between py-1",
                active && "bg-neutral-200/10",
            )}
            role="button"
            onClick={handleItemClick}
        >
            <div
                style={{
                    paddingLeft: level ? `${level * 12 + 12}px` : "12px",
                }}
                className="flex flex-row dark:text-neutral-400 text-black items-center gap-1 overflow-hidden"
            >
                {!!id && (
                    <div
                        role="button"
                        onClick={handleExpand}
                        className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    >
                        <ChevronIcon
                            size={18}
                            className="shrink-0 text-muted-foreground/50"
                        />
                    </div>
                )}

                {documentIcon ? (
                    <div className="shrink-0 mr-2 text-[18px]">
                        {documentIcon}
                    </div>
                ) : (
                    Icon && (
                        <Icon
                            className="shrink-0 dark:text-muted-foreground text-black mr-2"
                            size={18}
                        />
                    )
                )}

                <span className="truncate">{label}</span>
            </div>

            {(isSearch || isSetting) && (
                <div className="flex items-center text-muted-foreground pr-4">
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>
                        {isSearch ? "K" : "J"}
                    </kbd>
                </div>
            )}

            {!!id && (
                <div className="flex flex-row text-neutral-400 text-sm opacity-0 group-hover:opacity-100 mr-4 gap-2 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                role="button"
                                className="hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1 rounded-sm"
                            >
                                <MoreHorizontal size={18} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60 z-[100002]"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem
                                className="flex flex-row w-full gap-x-2 px-2 py-2 cursor-pointer hover:bg-neutral-400/30 items-center text-red-500"
                                onClick={onArchive}
                            >
                                <Trash size={16} className="mr-2" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="p-2 text-xs text-muted-foreground">
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreateDocument}
                        className="hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1 rounded-sm"
                    >
                        <Plus size={18} />
                    </div>
                </div>
            )}
        </div>
    );
}

Item.Skeleton = function SkeletonItem({ level }: { level?: number }) {
    return (
        <div
            className="flex gap-x-2 py-2"
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    );
};
