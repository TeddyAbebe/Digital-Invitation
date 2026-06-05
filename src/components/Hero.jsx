import { GraduationCap, Sparkles, CalendarHeart } from "lucide-react";
import { invitation } from "../config";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <header className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
      <div className="ornament-frame hero-frame-in mb-8 max-w-3xl px-6 py-10 sm:px-12 sm:py-12">
        <div
          className="animate-fade-up mb-6 flex items-center justify-center gap-2 text-sm tracking-[0.35em] text-[#b38b1a]/80 uppercase"
          style={{ animationDelay: "0.15s" }}
        >
          <Sparkles className="sparkle-spin h-4 w-4 text-[#b38b1a]" />
          <span>You are cordially invited</span>
          <Sparkles
            className="sparkle-spin h-4 w-4 text-[#b38b1a]"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div
          className="animate-scale-in mx-auto mb-6"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="pulse-ring animate-float group h-28 w-28 overflow-hidden rounded-full border-2 border-[#b38b1a]/40 shadow-[0_0_60px_rgba(179,139,26,0.25)]">
            <img
              src="/images/kalkidan-hero.png"
              alt={invitation.graduateName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        <p
          className="animate-fade-up mb-3 font-[family-name:var(--font-sans)] text-sm tracking-widest text-[#1a1a1a]/60 uppercase"
          style={{ animationDelay: "0.45s" }}
        >
          Celebrating the graduation of
        </p>

        <h1
          className="animate-fade-up mb-4 font-[family-name:var(--font-display)] text-5xl leading-tight font-semibold tracking-tight sm:text-6xl md:text-7xl"
          style={{
            animationDelay: "0.55s",
            background: "linear-gradient(105deg, #b38b1a 0%, #fde68a 30%, #d4af37 55%, #854d0e 75%, #d4af37 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "fade-up 0.9s ease-out 0.55s forwards, shimmer 6s linear 1.5s infinite",
          }}
        >
          {invitation.graduateName}
        </h1>

        <p
          className="animate-fade-up mb-2 font-[family-name:var(--font-display)] text-2xl text-[#1a1a1a]/90 italic sm:text-3xl"
          style={{ animationDelay: "0.65s" }}
        >
          {invitation.degree}
        </p>
        <p
          className="animate-fade-up mb-6 text-lg text-[#b38b1a]/75 sm:text-xl"
          style={{ animationDelay: "0.75s" }}
        >
          {invitation.field} · {invitation.classYear}
        </p>

        <div
          className="animate-fade-up badge-pop mx-auto inline-flex items-center gap-3 rounded-full border border-[#b38b1a]/35 bg-[#b38b1a]/8 px-5 py-2.5"
          style={{ animationDelay: "0.85s" }}
        >
          <CalendarHeart className="h-5 w-5 text-[#b38b1a]" />
          <span className="font-[family-name:var(--font-display)] text-lg text-[#1a1a1a]">
            {invitation.eventMonth} {invitation.eventDay},{" "}
            {invitation.eventYear}
          </span>
          <span className="hidden text-[#1a1a1a]/40 sm:inline">·</span>
          <span className="hidden font-[family-name:var(--font-sans)] text-sm text-[#b38b1a]/80 sm:inline">
            {invitation.venue}
          </span>
        </div>
      </div>

      <blockquote
        className="animate-fade-up quote-block max-w-lg px-4"
        style={{ animationDelay: "0.95s" }}
      >
        <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-[#1a1a1a]/80 italic sm:text-2xl">
          &ldquo;{invitation.verse}&rdquo;
        </p>
        <footer className="mt-3 font-[family-name:var(--font-sans)] text-sm tracking-widest text-[#b38b1a]/70 uppercase">
          {invitation.reference}
        </footer>
      </blockquote>

      <div
        className="animate-fade-up w-full max-w-md"
        style={{ animationDelay: "1.05s" }}
      >
        <Countdown />
      </div>
    </header>
  );
}
