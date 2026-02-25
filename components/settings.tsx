"use client";

import * as React from "react";
import { SettingsIcon } from "lucide-react";
import { useEffect } from "react";

import { useSettings } from "@/hook/use-settings";
import { useSidebar } from "@/hook/use-sidebar";
import { ModeToggle } from "@/app/(home)/components";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Settings() {
    const settings = useSettings();
    const sidebar = useSidebar();

    const { isOpen, onClose } = settings;

    useEffect(() => {
        if (isOpen && window.innerWidth < 768 && !sidebar.isCollapsed) {
            sidebar.onCollapse();
        }
    }, [isOpen, sidebar.isCollapsed, sidebar.onCollapse]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className="border-b pb-3">
                    <DialogTitle className="text-lg font-medium">
                        My settings
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-y-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-1">
                            <h3 className="text-[15px] font-medium">
                                Appearance
                            </h3>
                            <p className="text-[13px] text-muted-foreground">
                                Customize how Notion looks on your device
                            </p>
                        </div>
                        <ModeToggle />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-1">
                            <h3 className="text-[15px] font-medium">
                                Payments
                            </h3>
                            <p className="text-[13px] text-muted-foreground">
                                Manage your subscription and billing information
                            </p>
                        </div>
                        <div className="h-8 w-8 bg-black dark:bg-white flex items-center justify-center rounded-md cursor-pointer hover:opacity-80 transition">
                            <SettingsIcon
                                size={18}
                                className="text-white dark:text-black"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
