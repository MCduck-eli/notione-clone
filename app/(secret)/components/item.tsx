import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { ChevronDownIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import React from "react";

interface ItemProps {
    label: string;
    id: Id<"documents">;
    level: number;
}

export default function Item({ label, id, level }: ItemProps) {
    const createDocument = useMutation(api.document.createDocument);

    const onCreateDocument = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();

        if (!id) return;

        createDocument({
            title: "ontitle",
            parentDocument: id,
        });
    };

    const { user } = useUser();
    return (
        <div className="group text-neutral-400 w-full cursor-pointer hover:bg-neutral-300/20 transition-all ease-in-out duration-200  text-[20px] flex justify-between">
            {!!id && (
                <div className="flex flex-row items-center">
                    {" "}
                    <ChevronDownIcon />
                    {label}
                </div>
            )}
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {!!id && (
                            <div className="flex flex-row ga-2 cursor-pointer opacity-0 group-hover:opacity-100 text-neutral-400">
                                <MoreHorizontal />
                            </div>
                        )}
                    </DropdownMenuTrigger>
                    <div
                        className="flex flex-row ga-2 cursor-pointer opacity-0 group-hover:opacity-100 text-neutral-400"
                        role="button"
                        onClick={onCreateDocument}
                    >
                        <Plus />
                    </div>
                    <DropdownMenuContent>
                        <div className="flex flex-row m-2 p-2 cursor-pointer w-auto hover:bg-neutral-300/20 transition-all ease-in-out duration-200 gap-1">
                            <Trash />
                            Delete Content
                        </div>

                        <DropdownMenuItem className="w-full border-t border-neutral-400/40">
                            <div className="flex justify-center items-centerer  w-full text-[15px]">
                                Last send {user?.fullName}
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
