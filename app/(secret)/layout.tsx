"use client";

import { cn } from "@/lib/utils";
import User from "@/types/user.type";
import {
    ChevronsLeftIcon,
    Menu,
    Plus,
    Rocket,
    Search,
    Settings,
} from "lucide-react";
import DocumentList from "./components/document-list";
import Item from "./components/item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ItemBox from "./components/item-box";
import { useUser } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import TrashBox from "./components/trash-box";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import { useSearch } from "@/hook/use-search-hook";
import { useSettings } from "@/hook/use-settings";
import { useSidebar } from "@/hook/use-sidebar";

export default function SecretLayout({ children }: User) {
    const sidebar = useSidebar();
    const params = useParams();
    const { user } = useUser();

    const createDocument = useMutation(api.document.createDocument);
    const search = useSearch();
    const settings = useSettings();

    const onCreateDocument = () => {
        const promise = createDocument({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Creating document...",
            success: "Created successfully",
            error: "Error creating document",
        });
    };

    const arr = [1, 2];

    return (
        <div className="flex w-full h-screen overflow-hidden relative bg-background">
            {!sidebar.isCollapsed && (
                <div
                    onClick={sidebar.onCollapse}
                    className="md:hidden fixed inset-0 bg-black/40 z-99998"
                />
            )}

            <aside
                className={cn(
                    "dark:bg-neutral-900 bg-neutral-100 relative transition-all duration-300 group z-99999 flex flex-col h-full",

                    sidebar.isCollapsed
                        ? "w-0 -left-full overflow-hidden"
                        : "w-full md:w-60 left-0",
                    "fixed md:relative",
                )}
            >
                <div
                    role="button"
                    onClick={sidebar.onCollapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 transition",
                        "md:opacity-0 group-hover:opacity-100 opacity-100",
                    )}
                >
                    <ChevronsLeftIcon className="h-6 w-6" />
                </div>

                <div className="flex-1 overflow-y-auto mt-10 md:mt-0">
                    <ItemBox />
                    <div className="flex flex-col gap-1 mt-2">
                        <Item
                            isSearch
                            label="Search"
                            icon={Search}
                            onClick={() => search.onOpen()}
                        />
                        <Item
                            label="Settings"
                            icon={Settings}
                            onClick={() => settings.onOpen()}
                            isSetting
                        />
                        <Item
                            label="New Document"
                            icon={Plus}
                            onClick={onCreateDocument}
                        />
                    </div>
                    <div className="mt-4 px-2">
                        <DocumentList />
                        <div className="mt-6">
                            <TrashBox />
                        </div>
                    </div>
                </div>

                <div className="dark:bg-neutral-800 bg-neutral-200/50 w-full py-4 px-4 flex flex-col border-t">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <Rocket size={18} className="text-primary" />
                            <span className="text-sm font-medium truncate max-w-30">
                                {user?.firstName}
                            </span>
                        </div>
                        <span className="text-xs font-semibold">
                            {arr.length}/3
                        </span>
                    </div>
                    <Progress value={(arr.length / 3) * 100} className="h-2" />
                </div>
            </aside>

            <div className="flex-1 h-full overflow-hidden flex flex-col">
                {!!params.documentId ? (
                    <Navbar
                        isCollapsed={sidebar.isCollapsed}
                        onReset={sidebar.onReset}
                    />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full flex items-center h-12">
                        {sidebar.isCollapsed && (
                            <Menu
                                role="button"
                                onClick={sidebar.onReset}
                                className="h-6 w-6 text-muted-foreground cursor-pointer"
                            />
                        )}
                    </nav>
                )}
                <main className="flex-1 h-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
