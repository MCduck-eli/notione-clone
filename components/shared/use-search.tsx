"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { File } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hook/use-search-hook";
import { useSidebar } from "@/hook/use-sidebar";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";

export default function SearchCommand() {
    const { user } = useUser();
    const router = useRouter();
    const search = useSearch();
    const sidebar = useSidebar();

    const documents = useQuery(api.document.searchDocument);
    const { isOpen, onClose, onToggle } = search;

    useEffect(() => {
        if (isOpen) {
            const isMobile = window.innerWidth < 768;
            if (isMobile && !sidebar.isCollapsed) {
                sidebar.onCollapse();
            }
        }
    }, [isOpen, sidebar]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onToggle();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onToggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Notion...`}
            />
            <CommandList className="z-100001">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((doc) => (
                        <CommandItem
                            key={doc._id}
                            value={`${doc._id}-${doc.title}`}
                            title={doc.title}
                            onSelect={() => onSelect(doc._id)}
                        >
                            {doc.icon ? (
                                <p className="mr-2 text-[18px] leading-none">
                                    {doc.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="truncate">{doc.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
