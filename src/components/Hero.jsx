import { GraduationCap, Sparkles, CalendarHeart } from 'lucide-react'
import { invitation } from '../config'
import Countdown from './Countdown'

export default function Hero() {
  return (
    <header className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
      <div className="ornament-frame hero-frame-in mb-8 max-w-3xl px-6 py-10 sm:px-12 sm:py-12">
        <div
          className="animate-fade-up mb-6 flex items-center justify-center gap-2 text-sm tracking-[0.35em] text-[#e8d48b]/80 uppercase"
          style={{ animationDelay: '0.15s' }}
        >
          <Sparkles className="sparkle-spin h-4 w-4 text-[#c9a227]" />
          <span>You are cordially invited</span>
          <Sparkles className="sparkle-spin h-4 w-4 text-[#c9a227]" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="animate-scale-in mx-auto mb-6" style={{ animationDelay: '0.3s' }}>
          <div className="pulse-ring animate-float flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a227]/40 bg-[#121a2e]/80 shadow-[0_0_60px_rgba(201,162,39,0.25)]">
            <GraduationCap className="h-10 w-10 text-[#c9a227]" strokeWidth={1.25} />
          </div>
        </div>

        <p
          className="animate-fade-up mb-3 font-[family-name:var(--font-sans)] text-sm tracking-widest text-[#f7f0e3]/60 uppercase"
          style={{ animationDelay: '0.45s' }}
        >
          Celebrating the graduation of
        </p>

        <h1
          className="animate-fade-up gold-shimmer mb-4 font-[family-name:var(--font-display)] text-5xl leading-tight font-semibold tracking-tight sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.55s' }}
        >
          {invitation.graduateName}
        </h1>

        <p
          className="animate-fade-up mb-2 font-[family-name:var(--font-display)] text-2xl text-[#f7f0e3]/90 italic sm:text-3xl"
          style={{ animationDelay: '0.65s' }}
        >
          {invitation.degree}
        </p>
        <p
          className="animate-fade-up mb-6 text-lg text-[#e8d48b]/75 sm:text-xl"
          style={{ animationDelay: '0.75s' }}
        >
          {invitation.field} · {invitation.classYear}
        </p>

        <div
          className="animate-fade-up badge-pop mx-auto inline-flex items-center gap-3 rounded-full border border-[#c9a227]/35 bg-[#c9a227]/8 px-5 py-2.5"
          style={{ animationDelay: '0.85s' }}
        >
          <CalendarHeart className="h-5 w-5 text-[#c9a227]" />
          <span className="font-[family-name:var(--font-display)] text-lg text-[#f7f0e3]">
            {invitation.eventMonth} {invitation.eventDay}, {invitation.eventYear}
          </span>
          <span className="hidden text-[#f7f0e3]/40 sm:inline">·</span>
          <span className="hidden font-[family-name:var(--font-sans)] text-sm text-[#e8d48b]/80 sm:inline">
            {invitation.venue}
          </span>
        </div>
      </div>

      <blockquote
        className="animate-fade-up quote-block max-w-lg px-4"
        style={{ animationDelay: '0.95s' }}
      >
        <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-[#f7f0e3]/80 italic sm:text-2xl">
          &ldquo;{invitation.verse}&rdquo;
        </p>
        <footer className="mt-3 font-[family-name:var(--font-sans)] text-sm tracking-widest text-[#c9a227]/70 uppercase">
          {invitation.reference}
        </footer>
      </blockquote>

      <div className="animate-fade-up w-full max-w-md" style={{ animationDelay: '1.05s' }}>
        <Countdown />
      </div>

      <a
        href="#details"
        className="animate-fade-up mt-12 inline-flex flex-col items-center gap-2 text-[#c9a227]/80 transition hover:text-[#e8d48b]"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="font-[family-name:var(--font-sans)] text-xs tracking-[0.3em] uppercase">
          Scroll to discover
        </span>
        <span className="scroll-chevron block h-6 w-6 border-r-2 border-b-2 border-[#c9a227]/60" />
      </a>
    </header>
  )
}
