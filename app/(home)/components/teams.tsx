import Image from "next/image";

export default function Teams() {
    return (
        <div className="flex flex-col h-auto mt-10 mb-10 md:px-0 px-4">
            <h1 className="md:text-4xl text-3xl font-bold mb-2">
                One tool for your whole company <br /> Free for teams to try
            </h1>
            <div className="md:px-0 px-8">
                <p className="md:text-lg text-sm text-muted-foreground">
                    TRUSTED BY TEAMS AT{" "}
                </p>
                <div className="flex items-center gap-10 mt-5 flex-wrap">
                    {teams.map((team, index) => (
                        <div key={index}>
                            <Image
                                src={team}
                                alt={`Team`}
                                width={40}
                                height={40}
                                className="object-contain md:block hidden"
                            />

                            <Image
                                key={index}
                                src={team}
                                alt={`Team`}
                                width={25}
                                height={25}
                                className="object-contain md:hidden block"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const teams = [
    "/teams/1.svg",
    "/teams/2.svg",
    "/teams/3.svg",
    "/teams/4.svg",
    "/teams/5.svg",
];
