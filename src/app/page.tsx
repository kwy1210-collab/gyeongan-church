import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MediaSection from "@/components/MediaSection";
import WorshipSection from "@/components/WorshipSection";
import HappyLifeSection from "@/components/HappyLifeSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 selection:bg-amber-800 selection:text-white">
      <Header />
      <HeroSection />
      <MediaSection />
      <HappyLifeSection />
      <WorshipSection />

      <LocationSection />
      <Footer />
    </main>
  );
}
