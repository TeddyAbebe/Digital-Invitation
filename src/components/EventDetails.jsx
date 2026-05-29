import { Calendar, Clock, MapPin, Shirt, PartyPopper } from 'lucide-react'
import { invitation, schedule } from '../config'
import { useInView } from '../hooks/useInView'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const items = [
  { icon: Calendar, label: 'Date', value: invitation.date },
  { icon: Clock, label: 'Starts', value: invitation.time },
  { icon: MapPin, label: 'Venue', value: invitation.venue },
  { icon: Shirt, label: 'Dress Code', value: invitation.dressCode },
]

export default function EventDetails() {
  const [timelineRef, timelineVisible] = useInView(0.2)

  return (
    <section id="details" className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          icon={PartyPopper}
          title="Celebration Details"
          subtitle={invitation.rsvpNote}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map(({ icon: Icon, label, value }, i) => (
            <Reveal key={label} variant="up" delay={i * 100} duration={650}>
              <article className="glass-card group h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/45 hover:shadow-[0_12px_40px_rgba(201,162,39,0.15)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a227]/10 text-[#c9a227] transition duration-300 group-hover:scale-110 group-hover:bg-[#c9a227]/20">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.25em] text-[#e8d48b]/60 uppercase">
                  {label}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#f7f0e3]">
                  {value}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale" delay={200} className="mt-8">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h3 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl text-[#f7f0e3]">
              Program Schedule
            </h3>
            <ol ref={timelineRef} className="relative space-y-0">
              {schedule.map(({ time, event }, i) => (
                <li
                  key={time}
                  className={`timeline-step relative flex gap-5 pb-8 last:pb-0 ${timelineVisible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <span className="timeline-dot flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#c9a227]/50 bg-[#0a0f1a] font-[family-name:var(--font-sans)] text-xs font-medium text-[#c9a227]">
                      {i + 1}
                    </span>
                    {i < schedule.length - 1 && (
                      <span className="timeline-connector mt-1 w-px flex-1 bg-gradient-to-b from-[#c9a227]/40 to-[#c9a227]/10" />
                    )}
                  </div>
                  <div className="timeline-content min-w-0 flex-1 pt-1.5">
                    <p className="font-[family-name:var(--font-sans)] text-sm font-medium tracking-wide text-[#c9a227]">
                      {time}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[#f7f0e3]/90 sm:text-xl">
                      {event}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100} className="mt-5">
          <p className="glass-card rounded-2xl p-6 text-center text-lg text-[#f7f0e3]/80">
            <MapPin className="mr-2 inline h-5 w-5 text-[#c9a227]" />
            {invitation.address}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
