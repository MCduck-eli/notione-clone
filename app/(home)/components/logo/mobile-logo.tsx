import Image from "next/image";

export default function MobileLogo() {
    return (
        <div className="relative">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                className="block md:hidden dark:hidden"
            />

            <Image
                src="/logo-dark.svg"
                alt="Logo Dark"
                width={28}
                height={28}
                className="hidden dark:block md:hidden"
            />
        </div>
    );
}
