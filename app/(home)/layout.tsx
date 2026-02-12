import User from "@/types/user.type";
import { Footer, Navbar } from "./components";

export default function Layout({ children }: User) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
