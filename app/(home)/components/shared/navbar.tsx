"use client";

import { Button } from "@/components/ui/button";
import Logo from "../logo/logo";
import { ModeToggle } from "../theme/mode-toggle";
import { cn } from "@/lib/utils";
import useScrolled from "@/hook/scrolled-hook";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import MobileLogo from "../logo/mobile-logo";

export default function Navbar() {
    const scrolled = useScrolled();
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <div className="sticky inset-0 bg-white dark:bg-black z-50">
            <div
                className={
                    cn("w-full py-6 px-4 flex justify-between ") +
                    (scrolled ? " border-b border-neutral-200/20" : "")
                }
            >
                <div className="flex flex-row">
                    <div className="md:block hidden">
                        <Logo />
                    </div>
                    <div className="md:hidden block">
                        <MobileLogo />
                    </div>
                    <h1 className="ml-2 md:text-xl text-sm font-bold flex items-center">
                        Notion
                    </h1>
                </div>

                <div className="flex flex-row">
                    <div className="w-full flex justify-center items-center relative bottom-2">
                        {!isLoaded && <Loader />}
                    </div>

                    {isLoaded && !isSignedIn && (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" className="mr-2">
                                    Log In
                                </Button>
                            </SignInButton>

                            <SignUpButton mode="modal">
                                <Button>Get Notion Free</Button>
                            </SignUpButton>
                        </>
                    )}

                    {isLoaded && isSignedIn && (
                        <Button variant="ghost">
                            <Link href={"/documents"}>Enter Notion</Link>
                            <UserButton afterSignOutUrl="/" />
                        </Button>
                    )}

                    <div className="ml-2">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
