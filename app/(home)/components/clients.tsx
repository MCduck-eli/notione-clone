import Image from "next/image";

const clientsImages = [
    "/1.svg",
    "/2.svg",
    "/3.svg",
    "/4.svg",
    "/5.svg",
    "/6.svg",
    "/7.svg",
    "/8.svg",
    "/9.svg",
    "/10.svg",
    "/11.svg",
    "/12.svg",
    "/13.svg",
    "/14.svg",
];

export default function Clients() {
    return (
        <div className="max-w-150 mx-auto h-auto ">
            <h1 className="text-center text-4xl font-bold mt-10">
                Millions run on Notion every day
            </h1>
            <div className="flex justify-center mt-2">
                <span className="text-muted-foreground text-center text-lg">
                    Powering teams at companies of all sizes, from startups to
                    Fortune 500s. Established in 2013, Notion has been trusted
                </span>
            </div>

            <div className="flex justify-center items-center gap-10 mt-5 flex-wrap">
                {clientsImages.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`client-${index + 1}`}
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                ))}
            </div>
        </div>
    );
}
