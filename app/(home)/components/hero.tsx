import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Hero() {
    return (
        <div className="w-full h-auto mt-10">
            <div className="flex justify-center items-center flex-col gap-4 w-full">
                <h1 className="text-7xl font-bold text-center">
                    Write, Plan, Share. With AI <br /> at your side
                </h1>
                <p className="text-2xl text-center ">
                    notion is the all-in-one workspace for your notes, tasks,
                    <br />
                    wikis, and databases.
                </p>
                <Button className="cursor-pointer">
                    Get Notification <MoveRight />
                </Button>
            </div>
        </div>
    );
}
