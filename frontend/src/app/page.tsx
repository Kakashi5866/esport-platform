import Hero from "@/components/home/Hero";
import HeroStats from "@/components/home/HeroStats";
import FeaturedGames from "@/components/home/FeaturedGames";
import TournamentSection from "@/components/home/TournamentSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Partners from "@/components/home/Partners";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esports Platform | Compete in Free Fire, BGMI, Valorant Tournaments",
  description:
    "Join competitive esports tournaments for Free Fire, BGMI, Valorant and Call of Duty. Register, compete, and win real cash prizes.",
};

export default function Home() {
  return (
    <main>
      <Hero />

      <HeroStats />

      <FeaturedGames />

      <TournamentSection />

      <WhyChooseUs />

      <HowItWorks />

      <Partners />

      <FAQ />

      <CTA />
    </main>
  );
}