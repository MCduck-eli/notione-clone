import Image from "next/image";

export default function Logo() {
    return (
        <div className="relative">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="dark:hidden block"
            />
            <Image
                src="/logo-dark.svg"
                alt="Logo"
                width={50}
                height={50}
                className="hidden dark:block"
            />
        </div>
    );
}
