"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Item from "./item";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
}

export default function DocumentList({
    parentDocumentId,
    level = 0,
}: DocumentListProps) {
    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId,
    });

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const router = useRouter();
    const params = useParams();

    const onExpand = (documentId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        );
    }

    return (
        <div>
            {/* Agar papka bo'sh bo'lsa ko'rinadigan yozuv */}
            {documents?.length === 0 && level > 0 && (
                <p
                    style={{
                        paddingLeft: level ? `${level * 12 + 25}px` : "25px",
                    }}
                    className="text-sm font-medium text-muted-foreground/80 last:block"
                >
                    No pages inside
                </p>
            )}

            {documents?.map((document) => (
                <div key={document._id}>
                    <Item
                        label={document.title}
                        id={document._id}
                        level={level}
                        expanded={expanded[document._id]}
                        onExpand={() => onExpand(document._id)}
                        onClick={() => onRedirect(document._id)}
                        active={params.documentId === document._id}
                        documentIcon={document.icon}
                    />
                    {expanded[document._id] && (
                        <DocumentList
                            parentDocumentId={document._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
