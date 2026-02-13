"use client";

import Loader from "@/components/ui/loader";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
    const { isLoaded } = useAuth();

    return (
        <>
            <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 ">
                 {!isLoaded && <Loader />}
            </div>
        </>
    );
}
