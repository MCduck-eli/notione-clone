"use client";

import { cn } from "@/lib/utils";
import User from "@/types/user.type";
import { ChevronsLeftIcon, PanelLeftClose } from "lucide-react";
import { useState } from "react";

export default function SecretLayout({ children }: User) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div
                className={cn(
                    "bg-neutral-500/40 relative transition-all duration-300",
                    isCollapsed ? "w-0 overflow-hidden" : "w-60",
                )}
            >
                {!isCollapsed && (
                    <div
                        className="absolute top-3 right-2 cursor-pointer text-muted-foreground"
                        onClick={() => setIsCollapsed(true)}
                    >
                        <ChevronsLeftIcon className="h-8 w-8" />
                    </div>
                )}

                <div className="p-4">Sidebar content</div>
            </div>

            <div className="flex-1 relative transition-all duration-300">
                {isCollapsed && (
                    <div
                        className="absolute top-3 left-3 cursor-pointer text-muted-foreground z-50"
                        onClick={() => setIsCollapsed(false)}
                    >
                        <PanelLeftClose className="h-8 w-8" />
                    </div>
                )}

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
