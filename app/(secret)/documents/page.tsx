"use client";

import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import Loader from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function Page() {
    const { isLoaded } = useAuth();
=======
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Page() {
>>>>>>> recovery-branch
    const { user } = useUser();

    const createDocument = useMutation(api.document.createDocument);

<<<<<<< HEAD
    const onCreateDocument = () => {
        createDocument({
            title: "ontitle",
=======
    const onCreateDocuments = () => {
        const promise = createDocument({
            title: "Untitle",
        });
        toast.promise(promise, {
            loading: "Creating blank...",
            success: "Create blank successfully",
            error: "Error create blank",
>>>>>>> recovery-branch
        });
    };

    return (
        <>
<<<<<<< HEAD
            <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 ">
                <div className="w-full h-screen flex justify-center items-center flex-col gap-1">
                    <div className=" relative w-80 h-80">
                        <Image
                            src={"/note.svg"}
                            alt="note"
                            fill
                            className="object-cover dark:block hidden"
                        />
                        <Image
                            src={"/note-dark.svg"}
                            alt="note"
                            fill
                            className="object-cover dark:hidden block"
                        />
                    </div>
                    <span className="font-bold text-white text-2xl mb-1">
                        Welcome to {user?.fullName} documents
                    </span>
                    <Button
                        onClick={onCreateDocument}
                        className="cursor-pointer"
                    >
                        <Plus /> create a blank
                    </Button>
                </div>
                 {!isLoaded && <Loader />}
=======
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
>>>>>>> recovery-branch
            </div>
        </>
    );
}
