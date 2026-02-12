import { Clients, Hero, HeroImage, PriceCard, Teams } from "./components";

export default function Page() {
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <Hero />
                <HeroImage />
                <Clients />
                <Teams />
                <PriceCard />
            </div>
        </>
    );
}
