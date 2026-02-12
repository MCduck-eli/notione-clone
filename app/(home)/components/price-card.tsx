import { Button } from "@/components/ui/button";

export default function PriceCard() {
    return (
        <>
            <div className="w-full h-auto mb-8 flex flex-row gap-4">
                {price.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8  dark:text-white"
                    >
                        <h3 className="mb-4 text-2xl font-semibold">
                            {item.name}
                        </h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            {item.bio}
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">
                                {item.price}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                /month
                            </span>
                        </div>

                        <Button className="w-full mb-4 cursor-pointer">
                            Get started
                        </Button>

                        <ul role="list" className="mb-8 space-y-4 text-left">
                            {item.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <svg
                                        className="shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-3 text-gray-500 dark:text-gray-400">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

const price = [
    {
        name: "Free",
        bio: "For individuals who want to try out our product.",
        price: "Free/month",
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
        price: "$8/month",
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
        price: "$15/month",
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
