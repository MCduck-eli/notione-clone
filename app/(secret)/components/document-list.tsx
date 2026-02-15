"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Item from "./item";

interface DocumentProps {
    preventDocument?: Id<"documents">;
    level?: number;
}

export default function DocumentList({
    preventDocument,
    level = 0,
}: DocumentProps) {
    const documents = useQuery(api.document.getDocuments, {
        parentDocument: preventDocument,
    });

    return (
        <div>
            {documents?.map((item) => (
                <div key={item._id}>
                    <Item label={item.title} id={item._id} level={level} />
                    <DocumentList level={1} preventDocument={item._id} />
                </div>
            ))}
        </div>
    );
}
