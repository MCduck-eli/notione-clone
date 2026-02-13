import Logo from "../logo/logo";
import MobileLogo from "../logo/mobile-logo";

export default function Footer() {
    return (
        <div className="w-full h-auto px-4">
            <div className="flex justify-between items-center py-4">
                <div className="flex flex-row relative">
                    <div className="md:block hidden">
                        <Logo />
                    </div>
                    <div className="md:hidden block">
                        <MobileLogo />
                    </div>
                    <h1 className="ml-2 md:text-xl text-sm font-bold flex items-center">
                        Notion
                    </h1>
                </div>
                <div className="flex md:text-[15px] text-sm flex-row gap-4 text-muted-foreground">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    );
}
