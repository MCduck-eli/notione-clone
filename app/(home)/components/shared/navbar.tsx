"use client";

import { Button } from "@/components/ui/button";
import Logo from "../logo/logo";
import { ModeToggle } from "../theme/mode-toggle";
import { cn } from "@/lib/utils";
import useScrolled from "@/hook/scrolled-hook";

export default function Navbar() {
    const scrolled = useScrolled();
    return (
        <div className="sticky inset-0 bg-black z-50">
            <div
                className={
                    cn("w-full py-6 px-4 flex justify-between ") +
                    (scrolled ? " border-b border-neutral-200/20" : "")
                }
            >
                <div className="flex flex-row">
                    <Logo />
                    <h1 className="ml-2 text-xl font-bold flex items-center">
                        Notion
                    </h1>
                </div>
                <div className="flex flex-row">
                    <Button variant="ghost" className="mr-2">
                        Log In
                    </Button>
                    <Button>Get Notion Free</Button>
                    <div className="ml-2">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
