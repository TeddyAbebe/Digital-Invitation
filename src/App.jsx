import { useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Confetti from "./components/Confetti";
import DecorativeBg from "./components/DecorativeBg";
import FloatingOrbs from "./components/FloatingOrbs";
import FloatingNav from "./components/FloatingNav";
import MobileHeader from "./components/MobileHeader";
import FloatingCaps from "./components/FloatingCaps";
import PhotoGallery from "./components/PhotoGallery";
import SparkleTrail from "./components/SparkleTrail";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import LocationMap from "./components/LocationMap";
import WishForm from "./components/WishForm";
import SectionDivider from "./components/SectionDivider";
import Reveal from "./components/Reveal";
import { invitation } from "./config";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 hidden h-1 bg-gradient-to-r from-[#b38b1a] via-[#e5c158] to-[#b38b1a] z-50 transition-all duration-75 ease-out shadow-[0_1px_10px_rgba(201,162,39,0.4)] md:block"
        style={{ width: `${scrollProgress}%` }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(179, 139, 26, 0.1), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(107, 140, 206, 0.04), transparent),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(179, 139, 26, 0.06), transparent),
            linear-gradient(180deg, #ffffff 0%, #f8f9fa 45%, #ffffff 100%)
          `,
        }}
      />

      <DecorativeBg />
      <FloatingOrbs />
      <Confetti />
      <FloatingCaps />
      <SparkleTrail />
      <MobileHeader scrollProgress={scrollProgress} />
      <FloatingNav />
      <AudioPlayer />

      <main className="relative">
        <Hero />
        <SectionDivider />
        <PhotoGallery />
        <SectionDivider />
        <EventDetails />
        <SectionDivider />
        <LocationMap />
        <SectionDivider />
        <WishForm />
      </main>

      <footer className="relative z-10 border-t border-[#c9a227]/15 py-10 text-center">
        <Reveal variant="fade" duration={900}>
          <p
            className="font-[family-name:var(--font-display)] text-lg"
            style={{
              background: "linear-gradient(105deg, #b38b1a 0%, #fde68a 30%, #d4af37 55%, #854d0e 75%, #d4af37 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 6s linear infinite",
            }}
          >
            {invitation.graduateName}
          </p>
          <p className="mt-2 font-[family-name:var(--font-sans)] text-xs tracking-[0.25em] text-[#1a1a1a]/40 uppercase">
            {invitation.classYear} · With love & gratitude
          </p>
          {/* <p className="mt-2 font-[family-name:var(--font-sans)] text-xs text-[#1a1a1a]/55">
            Made with ❤️ by{" "}
            <a
              href="https://tewodros.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b38b1a] hover:underline font-semibold transition duration-300 hover:text-[#d4af37]"
            >
              Teddy
            </a>
          </p> */}
        </Reveal>
      </footer>
    </div>
  );
}

export default App;
