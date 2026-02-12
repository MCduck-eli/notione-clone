"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <div className="w-full h-auto mt-10">
            <div className="flex justify-center items-center flex-col gap-4 w-full">
                <h1 className="text-7xl font-bold text-center">
                    Write, Plan, Share. With AI <br /> at your side
                </h1>

                <p className="text-2xl text-center">
                    Notion is the all-in-one workspace for your notes, tasks,
                    <br />
                    wikis, and databases.
                </p>
                <div className="w-full flex justify-center items-center ">
                    {!isLoaded && <Loader />}
                </div>

                {isLoaded && !isSignedIn && (
                    <div className="mt-4">
                        <SignInButton mode="modal">
                            <Button className="cursor-pointer">
                                Get Notion Free <MoveRight />
                            </Button>
                        </SignInButton>
                    </div>
                )}

                {isLoaded && isSignedIn && (
                    <div className="mt-4">
                        <Link href="/documents">
                            <Button className="cursor-pointer">
                                Enter Notion <MoveRight />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
