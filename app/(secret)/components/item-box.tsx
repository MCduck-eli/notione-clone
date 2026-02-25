"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";

export default function ItemBox() {
    const { user } = useUser();

    return (
        <div className="dark:bg-neutral-800 bg-neutral-400/50 w-full py-2">
            <div className="pl-4">
                <DropdownMenu>
                    <div className="flex flex-row gap-1 cursor-pointer">
                        <Avatar>
                            <AvatarImage src={user?.imageUrl} alt="user" />
                            <AvatarFallback>{user?.username}</AvatarFallback>
                        </Avatar>

                        <div className="flex items-center group">
                            <span className="dark:text-white text-black">
                                {user?.fullName}
                            </span>
                        </div>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer" role="button">
                                <ChevronsLeftRight
                                    size={18}
                                    className="rotate-90 mt-2"
                                />
                            </div>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent
                        className="w-80 z-[100000]"
                        align="start"
                        alignOffset={11}
                        forceMount
                    >
                        <div className="px-1 py-2 bg-neutral-800 rounded-[5px] flex flex-col text-white">
                            <span className="mb-1">
                                {user?.firstName} Notion
                            </span>
                            <div
                                className="flex justify-center border-t border-neutral-500 mt-1 "
                                role="button"
                            >
                                <SignOutButton>Log out</SignOutButton>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
