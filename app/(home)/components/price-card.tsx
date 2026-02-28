"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { SignInButton, useAuth } from "@clerk/nextjs";

export default function PriceCard() {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <div className="w-full px-4 py-8">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {price.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-6 w-full mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 xl:p-8 dark:bg-neutral-800/50 dark:text-white"
                    >
                        <h3 className="mb-4 text-2xl font-bold">{item.name}</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 min-h-15">
                            {item.bio}
                        </p>

                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-4xl md:text-5xl font-extrabold">
                                {item.price.split("/")[0]}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                /month
                            </span>
                        </div>

                        <div className="min-h-[50px] flex items-center justify-center">
                            {!isLoaded ? (
                                <Loader />
                            ) : !isSignedIn ? (
                                <SignInButton mode="modal">
                                    <Button className="w-full cursor-pointer hover:opacity-80 transition">
                                        Log In
                                    </Button>
                                </SignInButton>
                            ) : (
                                <Button className="w-full cursor-pointer hover:opacity-80 transition">
                                    Get started
                                </Button>
                            )}
                        </div>

                        <ul role="list" className="mt-8 space-y-4 text-left">
                            {item.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-start">
                                    <svg
                                        className="shrink-0 w-5 h-5 text-green-500 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

const price = [
    {
        name: "Free",
        bio: "For individuals who want to try out our product.",
        price: "Free",
        features: [
            "Collaboration with up to 3 users",
            "Basic analytics and reporting",
            "Limited access to integrations",
            "Community support",
            "Access to basic features",
            "Email support",
        ],
    },
    {
        name: "Plus",
        bio: "For teams who want to scale their productivity.",
        price: "$8",
        features: [
            "Unlimited collaboration",
            "Advanced analytics and reporting",
            "Full access to integrations",
            "Priority support",
            "Access to all features",
            "Dedicated account manager",
        ],
    },
    {
        name: "Business",
        bio: "For businesses that need advanced features and support.",
        price: "$15",
        features: [
            "Unlimited collaboration",
            "Advanced analytics and reporting",
            "Full access to integrations",
            "Priority support",
            "Access to all features",
            "Dedicated account manager",
        ],
    },
];
