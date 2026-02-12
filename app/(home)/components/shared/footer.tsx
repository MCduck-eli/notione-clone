import Logo from "../logo/logo";

export default function Footer() {
    return (
        <div className="w-full h-auto px-4">
            <div className="flex justify-between items-center py-4">
                <div className="flex flex-row">
                    <Logo />
                    <h1 className="ml-2 text-xl font-bold flex items-center">
                        Notion
                    </h1>
                </div>
                <div className="flex flex-row gap-4 text-muted-foreground">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    );
}
