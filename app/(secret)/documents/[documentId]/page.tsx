"use client";

import Cover from "@/components/shared/cover";
import Toolbar from "@/components/shared/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use } from "react";

interface DocumentIdProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
}

export default function DocumentId({ params }: DocumentIdProps) {
    const resolvedParams = use(params);

    const document = useQuery(api.document.getDocumentById, {
        id: resolvedParams.documentId as Id<"documents">,
    });

    if (!document) return null;

    return (
        <div className="mt-5">
            <Cover url="/coverImage.jpg" />
            <div className="max-w-3xl mx-auto">
                <Toolbar document={document} />
            </div>
        </div>
    );
}
