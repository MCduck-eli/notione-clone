"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Authenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import User from "@/types/user.type";
import UseSearch from "@/components/shared/use-search";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClerkClientProvider({ children }: User) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    <UseSearch />
                </Authenticated>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

// layout
