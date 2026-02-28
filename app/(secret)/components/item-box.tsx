"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ItemBox() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = () => {
        signOut(() => router.push("/"));
    };

    return (
        <div className="dark:bg-neutral-800 bg-neutral-400/50 w-full py-2">
            <div className="pl-4">
                <DropdownMenu>
                    <div className="flex flex-row gap-1 items-center cursor-pointer group">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.imageUrl} alt="user" />
                            <AvatarFallback>
                                {user?.username?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center">
                            <span className="dark:text-white text-black text-sm font-medium line-clamp-1">
                                {user?.fullName}
                            </span>
                        </div>

                        <DropdownMenuTrigger asChild>
                            <div
                                className="cursor-pointer p-1 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm"
                                role="button"
                            >
                                <ChevronsLeftRight
                                    size={14}
                                    className="rotate-90 text-muted-foreground"
                                />
                            </div>
                        </DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent
                        className="w-80 z-100000"
                        align="start"
                        alignOffset={11}
                        forceMount
                    >
                        <div className="flex flex-col space-y-4 p-2">
                            <p className="text-xs font-medium leading-none text-muted-foreground">
                                {user?.emailAddresses[0].emailAddress}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <div className="rounded-md bg-secondary p-1">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.imageUrl} />
                                    </Avatar>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm line-clamp-1">
                                        {user?.fullName}&apos;s Notion
                                    </p>
                                </div>
                            </div>
                            <div
                                onClick={handleSignOut}
                                className="flex items-center text-sm p-2 w-full hover:bg-primary/5 cursor-pointer rounded-sm text-red-500"
                                role="button"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Log out
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
