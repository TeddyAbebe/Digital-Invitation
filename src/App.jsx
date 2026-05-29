import Confetti from './components/Confetti'
import DecorativeBg from './components/DecorativeBg'
import FloatingOrbs from './components/FloatingOrbs'
import FloatingNav from './components/FloatingNav'
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import LocationMap from './components/LocationMap'
import WishForm from './components/WishForm'
import SectionDivider from './components/SectionDivider'
import Reveal from './components/Reveal'
import { invitation } from './config'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201, 162, 39, 0.2), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(107, 140, 206, 0.06), transparent),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(201, 162, 39, 0.08), transparent),
            linear-gradient(180deg, #0a0f1a 0%, #121a2e 45%, #0a0f1a 100%)
          `,
        }}
      />

      <DecorativeBg />
      <FloatingOrbs />
      <Confetti />
      <FloatingNav />

      <main className="relative">
        <Hero />
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
          <p className="mt-2 font-[family-name:var(--font-sans)] text-xs tracking-[0.25em] text-[#f7f0e3]/40 uppercase">
            {invitation.classYear} · With love & gratitude
          </p>
        </Reveal>
      </footer>
    </div>
  )
}

export default App
