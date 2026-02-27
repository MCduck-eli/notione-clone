"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Page() {
    const { user } = useUser();
    const { isLoaded } = useAuth();

    const createDocument = useMutation(api.document.createDocument);

    const onCreateDocuments = () => {
        const promise = createDocument({
            title: "Untitled",
        });

        toast.promise(promise, {
            loading: "Creating blank...",
            success: "Created blank successfully!",
            error: "Failed to create blank.",
        });
    };

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
            <div className="relative w-80 h-80">
                <Image
                    src="/note.svg"
                    alt="note"
                    fill
                    className="object-cover dark:block hidden"
                />
                <Image
                    src="/note-dark.svg"
                    alt="note-dark"
                    fill
                    className="object-cover dark:hidden block"
                />
            </div>

            <h2 className="font-bold text-2xl">
                Welcome to {user?.fullName} documents
            </h2>

            <Button
                onClick={onCreateDocuments}
                className="cursor-pointer flex items-center gap-2"
            >
                <Plus className="h-4 w-4" />
                Create a blank
            </Button>
        </div>
    );
}
