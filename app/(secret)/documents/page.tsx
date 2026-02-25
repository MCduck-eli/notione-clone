"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Page() {
    const { user } = useUser();

    const createDocument = useMutation(api.document.createDocument);

    const onCreateDocuments = () => {
        const promise = createDocument({
            title: "Untitle",
        });
        toast.promise(promise, {
            loading: "Creating blank...",
            success: "Create blank successfully",
            error: "Error create blank",
        });
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col">
                <div className="relative w-60 h-60">
                    <Image
                        src={"/note.svg"}
                        alt="note"
                        fill
                        className="object-cover dark:block hidden"
                    />
                    <Image
                        src={"/note.dark.svg"}
                        alt="note-dark"
                        fill
                        className="object-cover dark:hidden block"
                    />
                </div>
                <span className="font-semibold text-2xl">
                    Welcome to {user?.fullName} documents
                </span>
                <div className="mt-2 flex flex-row">
                    <Button
                        className="cursor-pointer"
                        onClick={onCreateDocuments}
                    >
                        Create blank
                        <Plus />
                    </Button>
                </div>
            </div>
        </>
    );
}
