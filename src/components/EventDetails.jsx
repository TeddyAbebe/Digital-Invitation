import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  PartyPopper,
  Users,
  UtensilsCrossed,
  Camera,
  Music2,
  Footprints,
} from "lucide-react";
import { invitation, schedule } from "../config";
import { useInView } from "../hooks/useInView";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const items = [
  { icon: Calendar, label: "Date", value: invitation.date },
  { icon: Clock, label: "Starts", value: invitation.time },
  { icon: MapPin, label: "Venue", value: invitation.venue },
  { icon: Shirt, label: "Dress Code", value: invitation.dressCode },
];

const PANEL_CLASS =
  "schedule-panel ornament-frame relative mx-auto max-w-2xl overflow-hidden rounded-2xl p-5 sm:max-w-3xl sm:rounded-3xl sm:p-7";

function PanelGlow() {
  return (
    <>
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#b38b1a]/8 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl" />
    </>
  );
}

function PanelHeading({ eyebrow, title }) {
  return (
    <div className="relative mb-5 text-center sm:mb-6">
      <p className="font-[family-name:var(--font-sans)] text-[10px] font-semibold tracking-[0.35em] text-[#8a6a12] uppercase sm:text-xs">
        {eyebrow}
      </p>
      <h3 className="gold-shimmer mt-1.5 font-[family-name:var(--font-display)] text-2xl font-semibold sm:mt-2 sm:text-3xl">
        {title}
      </h3>
      <div className="schedule-title-line mx-auto mt-3" />
    </div>
  );
}

function DetailIconBox({ icon: Icon, index }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-[#b38b1a]/50 bg-white shadow-[0_4px_16px_rgba(179,139,26,0.16)] sm:h-12 sm:w-12 sm:rounded-2xl">
      <Footprints
        className="absolute h-6 w-6 text-[#b38b1a]/20 sm:h-7 sm:w-7"
        strokeWidth={1.25}
      />
      <Icon className="relative h-4 w-4 text-[#8a6a12] sm:h-5 sm:w-5" strokeWidth={1.75} />
      <span className="relative mt-0.5 font-[family-name:var(--font-sans)] text-[9px] font-bold text-[#b38b1a]">
        {index}
      </span>
    </div>
  );
}

const scheduleIcons = [Users, UtensilsCrossed, Camera, Music2];

const PATH_D =
  "M 42 52 C 100 52, 100 92, 158 132 C 100 172, 100 212, 42 252 C 100 292, 100 332, 158 372";

const PATH_NODES = [
  { x: 42, y: 52 },
  { x: 158, y: 132 },
  { x: 42, y: 252 },
  { x: 158, y: 372 },
];

export default function EventDetails() {
  const [timelineRef, timelineVisible] = useInView(0.15);

  return (
    <section id="details" className="details-section relative z-10 overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="details-orb details-orb-a" />
        <div className="details-orb details-orb-b" />
        <div className="details-grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          icon={PartyPopper}
          title="Celebration Details"
          subtitle={invitation.rsvpNote}
        />

        <Reveal variant="scale" delay={100}>
          <div className={PANEL_CLASS}>
            <PanelGlow />
            <PanelHeading eyebrow="At A Glance" title="Event Information" />

            <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4">
              {items.map(({ icon: Icon, label, value }, i) => (
                <Reveal key={label} variant="up" delay={i * 80} duration={550}>
                  <article className="details-inner-card group flex h-full gap-2.5 rounded-xl border border-[#b38b1a]/20 bg-white/70 p-3 backdrop-blur-sm transition duration-300 hover:border-[#b38b1a]/35 hover:shadow-[0_6px_24px_rgba(179,139,26,0.12)] sm:gap-3 sm:rounded-2xl sm:p-4">
                    <DetailIconBox icon={Icon} index={i + 1} />
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <span className="schedule-time-pill inline-flex w-fit items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} />
                        {label}
                      </span>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-base leading-snug text-[#1a1a1a] sm:text-lg">
                        {value}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={200} className="mt-6 sm:mt-8">
          <div className={PANEL_CLASS}>
            <PanelGlow />
            <PanelHeading eyebrow="The Evening" title="Program Schedule" />

            <div
              ref={timelineRef}
              className={`schedule-path-wrap relative ${timelineVisible ? "is-visible" : ""}`}
            >
              <svg
                className="schedule-path-svg"
                viewBox="0 0 200 420"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  <linearGradient id="scheduleGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b38b1a" />
                    <stop offset="50%" stopColor="#e5c158" />
                    <stop offset="100%" stopColor="#b38b1a" />
                  </linearGradient>
                </defs>
                <path className="schedule-path-glow" d={PATH_D} />
                <path className="schedule-path-line" d={PATH_D} pathLength="100" />
                {PATH_NODES.map((node, i) => (
                  <circle
                    key={i}
                    className="schedule-path-node-dot"
                    cx={node.x}
                    cy={node.y}
                    r="5"
                  />
                ))}
              </svg>

              <ol className="schedule-path-list relative space-y-4 sm:space-y-6">
                {schedule.map(({ time, event }, i) => {
                  const StepIcon = scheduleIcons[i] ?? Sparkles;
                  const isRight = i % 2 === 1;

                  return (
                    <li
                      key={time}
                      className={`timeline-step schedule-path-step flex ${isRight ? "justify-end" : "justify-start"} ${timelineVisible ? "is-visible" : ""}`}
                      style={{ transitionDelay: `${300 + i * 180}ms` }}
                    >
                      <div
                        className={`schedule-path-card flex w-full max-w-[90%] gap-2.5 sm:max-w-[64%] sm:gap-3 ${isRight ? "flex-row-reverse text-right" : "flex-row text-left"}`}
                      >
                        <div className="schedule-footprint timeline-dot relative flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-[#b38b1a]/50 bg-white shadow-[0_4px_16px_rgba(179,139,26,0.16)] sm:h-12 sm:w-12 sm:rounded-2xl">
                          <Footprints
                            className="absolute h-6 w-6 text-[#b38b1a]/20 sm:h-7 sm:w-7"
                            strokeWidth={1.25}
                          />
                          <StepIcon
                            className="relative h-4 w-4 text-[#8a6a12] sm:h-5 sm:w-5"
                            strokeWidth={1.75}
                          />
                          <span className="relative mt-0.5 font-[family-name:var(--font-sans)] text-[9px] font-bold text-[#b38b1a]">
                            {i + 1}
                          </span>
                        </div>

                        <div
                          className={`timeline-content schedule-content flex min-w-0 flex-1 flex-col rounded-xl border border-[#b38b1a]/20 bg-white/70 px-3 py-3 backdrop-blur-sm sm:rounded-2xl sm:px-4 sm:py-3.5 ${isRight ? "items-end" : "items-start"}`}
                        >
                          <span className="schedule-time-pill inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} />
                            {time}
                          </span>
                          <p className="mt-2 font-[family-name:var(--font-display)] text-base leading-snug text-[#1a1a1a] sm:text-lg">
                            {event}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100} className="mt-6 sm:mt-8">
          <div className={PANEL_CLASS}>
            <PanelGlow />
            <PanelHeading eyebrow="Find Us" title="Location" />

            <article className="details-inner-card flex items-center gap-3 rounded-xl border border-[#b38b1a]/20 bg-white/70 p-4 backdrop-blur-sm sm:gap-4 sm:rounded-2xl sm:p-5">
              <DetailIconBox icon={MapPin} index={1} />
              <div className="min-w-0 flex-1">
                <span className="schedule-time-pill inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} />
                  Address
                </span>
                <p className="mt-2 font-[family-name:var(--font-display)] text-base leading-snug text-[#1a1a1a] sm:text-lg">
                  {invitation.address}
                </p>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
