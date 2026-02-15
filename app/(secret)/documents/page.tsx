"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function Page() {
    const { isLoaded } = useAuth();
    const { user } = useUser();

    const createDocument = useMutation(api.document.createDocument);

    const onCreateDocument = () => {
        createDocument({
            title: "ontitle",
        });
    };

    return (
        <>
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
            </div>
        </>
    );
}
