import Image from "next/image";

export default function HeroMobileImage() {
    return (
        <div className="w-full h-auto mt-10">
            <div className="flex justify-center items-center relative">
                <Image
                    src="/men.svg"
                    alt="men"
                    width={350}
                    height={250}
                    className="object-cover dark:hidden block"
                />
                <Image
                    src="/men-dark.svg"
                    alt="men"
                    width={350}
                    height={250}
                    className="object-cover dark:block hidden"
                />
            </div>
        </div>
    );
}
