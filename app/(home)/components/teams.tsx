import Image from "next/image";

export default function Teams() {
    return (
        <div className="flex flex-col h-auto mt-10 mb-10">
            <h1 className="text-4xl font-bold mb-2">
                One tool for your whole company <br /> Free for teams to try
            </h1>
            <p className="text-lg text-muted-foreground">
                TRUSTED BY TEAMS AT{" "}
            </p>
            <div className="flex items-center gap-10 mt-5 flex-wrap">
                {teams.map((team, index) => (
                    <Image
                        key={index}
                        src={team}
                        alt={`Team`}
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                ))}
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
