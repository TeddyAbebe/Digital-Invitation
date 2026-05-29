import Reveal from './Reveal'

export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-14 text-center">
      <Reveal variant="scale" duration={600}>
        <div className="pulse-ring mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 shadow-[0_0_40px_rgba(201,162,39,0.12)]">
          <Icon className="icon-wiggle h-7 w-7 text-[#c9a227]" strokeWidth={1.25} />
        </div>
      </Reveal>
      <Reveal variant="up" delay={100}>
        <h2 className="gold-shimmer font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal variant="fade" delay={200}>
          <p className="mt-3 text-lg text-[#f7f0e3]/65">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
