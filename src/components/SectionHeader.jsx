import Reveal from "./Reveal";

export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <header className="mb-12 text-center">
      <Reveal variant="scale" duration={800}>
        <div className="pulse-ring mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#b38b1a]/30 bg-[#b38b1a]/5 shadow-[0_0_40px_rgba(179,139,26,0.12)]">
          <Icon
            className="icon-wiggle h-7 w-7 text-[#b38b1a]"
            strokeWidth={1.25}
          />
        </div>
      </Reveal>
      <Reveal variant="up" delay={150}>
        <h2 className="gold-shimmer font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-[#1a1a1a]/65">{subtitle}</p>
        )}
      </Reveal>
    </header>
  );
}
