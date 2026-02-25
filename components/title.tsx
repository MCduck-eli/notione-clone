"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { updateFields } from "@/convex/document";

interface TitleProps {
    document: Doc<"documents">;
}

export default function Title({ document }: TitleProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [editing, isEditing] = useState<boolean>(false);
    const [title, setTitle] = useState(document?.title || "Untitled");
    const updateDocuments = useMutation(api.document.updateFields);

    useEffect(() => {
        if (document?.title) {
            setTitle(document.title);
        }
    }, [document?.title]);

    if (!document) {
        return <Skeleton className="h-6 w-20 rounded-md" />;
    }

    const handlerInput = () => {
        setTitle(document?.title);
        isEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(
                0,
                inputRef.current.value.length,
            );
        }, 0);
    };

    const disabledInput = () => {
        isEditing(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        updateDocuments({
            id: document._id,
            title: event.target.value || "Untitled",
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disabledInput();
        }
    };

    return (
        <div className="flex items-center gap-x-2 pl-10 py-2">
            {!!document.icon && <p>{document.icon}</p>}
            {editing ? (
                <Input
                    ref={inputRef}
                    onClick={handlerInput}
                    onBlur={disabledInput}
                    value={title}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            ) : (
                <Button variant={"ghost"} onClick={handlerInput}>
                    <span className="px-1 py-1 rounded-[5px] cursor-pointer">
                        {document.title}
                    </span>
                </Button>
            )}
        </div>
    );
}

Title.Skleton = function titleSkleton() {
    return <Skeleton className="h-8 w-20" />;
};
