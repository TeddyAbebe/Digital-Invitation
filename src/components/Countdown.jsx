import { useEffect, useRef, useState } from "react";
import { invitation } from "../config";

function getTimeLeft() {
  const target = new Date(`${invitation.eventIso}T17:00:00`).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

function CountdownDigit({ value, label, delay }) {
  const prev = useRef(value);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setPop(true);
      prev.current = value;
      const t = setTimeout(() => setPop(false), 400);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div
      className="glass-card countdown-cell rounded-xl px-2 py-3 text-center sm:rounded-2xl sm:px-4 sm:py-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p
        className={`gold-shimmer font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl ${pop ? "digit-pop" : ""}`}
      >
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-1 font-[family-name:var(--font-sans)] text-[10px] tracking-widest text-[#1a1a1a]/45 uppercase sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.done) return null;

  return (
    <div className="countdown-grid mt-10 grid grid-cols-4 gap-2 sm:gap-4">
      {units.map(({ key, label }, i) => (
        <CountdownDigit
          key={key}
          value={time[key]}
          label={label}
          delay={i * 80}
        />
      ))}
    </div>
  );
}
