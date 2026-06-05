import Confetti from "./components/Confetti";
import DecorativeBg from "./components/DecorativeBg";
import FloatingOrbs from "./components/FloatingOrbs";
import FloatingNav from "./components/FloatingNav";
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
  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
      <FloatingNav />

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
          <p className="gold-shimmer font-[family-name:var(--font-display)] text-lg">
            {invitation.graduateName}
          </p>
          <p className="mt-2 font-[family-name:var(--font-sans)] text-xs tracking-[0.25em] text-[#1a1a1a]/40 uppercase">
            {invitation.classYear} · With love & gratitude
          </p>
        </Reveal>
      </footer>
    </div>
  );
}

export default App;
