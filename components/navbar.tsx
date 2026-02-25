"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Loader from "./ui/loader";
import Title from "./title";
import { Menu } from "lucide-react";
import PublishAt from "./publishat";
import MenuPage from "./menu";
import { Banner } from "./banner";

interface INavbarProps {
    isCollapsed: boolean;
    onReset: () => void;
}

export default function Navbar({ isCollapsed, onReset }: INavbarProps) {
    const params = useParams();

    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    });

    if (document === undefined) {
        <div className="w-full flex justify-between items-center px-2 py-4">
            <nav>
                <Loader />
            </nav>
            <div>
                <Loader />
            </div>
        </div>;
    }

    if (document === null) {
        return null;
    }

    return (
        <>
            <div>
                {isCollapsed && (
                    <div
                        className="absolute top-3 left-3 cursor-pointer text-muted-foreground z-50"
                        onClick={onReset}
                    >
                        <Menu className="h-6 w-6" />
                    </div>
                )}
            </div>
            <div className="w-full flex justify-between items-center">
                <div>
                    <Title document={document!} />
                </div>

                <div className="flex flex-row px-8">
                    <PublishAt document={document!} />
                    {/* @ts-ignore */}
                    <MenuPage documentId={document?._id} />
                </div>
            </div>
            {document?.isArchived && <Banner documentId={document?._id} />}
        </>
    );
}
