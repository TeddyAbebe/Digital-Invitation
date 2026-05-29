import { useInView } from '../hooks/useInView'

export default function SectionDivider() {
  const [ref, visible] = useInView(0.5)

  return (
    <div
      ref={ref}
      className={`divider-expand relative z-10 flex items-center justify-center px-6 py-4 ${visible ? 'is-visible' : ''}`}
      aria-hidden
    >
      <div className="divider-line divider-line-left h-px w-16 bg-gradient-to-r from-transparent to-[#c9a227]/50" />
      <div className="divider-center mx-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a227]/70" />
        <span className="sparkle-spin font-[family-name:var(--font-display)] text-lg text-[#c9a227]/80">
          ✦
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a227]/70" />
      </div>
      <div className="divider-line divider-line-right h-px w-16 bg-gradient-to-l from-transparent to-[#c9a227]/50" />
    </div>
  )
}
