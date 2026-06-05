import { useEffect, useRef, useState } from "react";

/*
  Gentle classical background — Bach "Air on the G String"
  (US Air Force Strings, public domain). Matches the soft
  light-academia orchestral feel of graduation classical playlists.
*/

const MUSIC_SRC = "/audio/graduation-classical.mp3";
const VOLUME = 0.35;

function MusicNoteIcon({ variant, className }) {
  if (variant === 0) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 3v10.5c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h2.5L19 5.5V1h-4L9 3zm8 12.5c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-3.5h-2v3.5z" />
    </svg>
  );
}

function FloatingMusicNotes({ active, floatDown = false }) {
  const [notes, setNotes] = useState([]);
  const noteId = useRef(0);
  const noteAnimClass = floatDown
    ? "animate-music-note-float-down"
    : "animate-music-note-float";

  useEffect(() => {
    if (!active) {
      setNotes([]);
      return;
    }

    const spawn = () => {
      const id = ++noteId.current;
      const entry = {
        id,
        drift: (Math.random() - 0.5) * 22,
        variant: Math.floor(Math.random() * 2),
        size: 18 + Math.random() * 8,
        duration: 2.2 + Math.random() * 0.8,
      };

      setNotes((prev) => [...prev, entry]);
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }, entry.duration * 1000 + 80);
    };

    spawn();
    const timer = setInterval(spawn, 650);
    return () => clearInterval(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden>
      {notes.map((note) => (
        <span
          key={note.id}
          className={`${noteAnimClass} absolute left-1/2 top-1/2 text-[#b38b1a] drop-shadow-[0_1px_3px_rgba(179,139,26,0.35)]`}
          style={{
            "--note-drift": `${note.drift}px`,
            width: note.size,
            height: note.size,
            animationDuration: `${note.duration}s`,
          }}
        >
          <MusicNoteIcon variant={note.variant} className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}

function MuteButton({ muted, onClick, size = "desktop" }) {
  const isHeader = size === "header";

  return (
    <button
      onClick={onClick}
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Unmute music" : "Mute music"}
      className={`relative flex shrink-0 items-center justify-center rounded-full border border-[#b38b1a]/35 bg-white shadow-[0_2px_10px_rgba(179,139,26,0.15)] transition-all duration-300 hover:border-[#b38b1a] hover:shadow-[0_4px_18px_rgba(179,139,26,0.3)] active:scale-95 ${
        isHeader ? "p-1.5" : "h-11 w-11 hover:scale-110"
      }`}
    >
      {muted ? (
        <svg
          className={`text-[#b38b1a]/45 ${isHeader ? "h-4 w-4" : "h-5 w-5"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          className={`text-[#b38b1a] ${isHeader ? "h-4 w-4" : "h-5 w-5"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export default function AudioPlayer({ embedded = false }) {
  const audioRef = useRef(null);
  const startedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const isMobile = useIsMobile();

  const startMusic = () => {
    if (startedRef.current) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;
    audio.loop = true;

    audio
      .play()
      .then(() => {
        startedRef.current = true;
        setPlaying(true);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const handleScroll = () => startMusic();
    window.addEventListener("scroll", handleScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!playing) startMusic();
    setMuted((m) => !m);
  };

  const showNotes = playing && !muted;

  if (embedded) {
    return (
      <>
        <audio ref={audioRef} src={MUSIC_SRC} preload="auto" />
        <div className="relative z-10 shrink-0 overflow-visible">
          <FloatingMusicNotes active={showNotes} floatDown />
          <MuteButton muted={muted} onClick={toggleMute} size="header" />
        </div>
      </>
    );
  }

  if (isMobile) return null;

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" />

      <div className="fixed bottom-6 left-5 z-[60] h-11 w-11">
        <FloatingMusicNotes active={showNotes} />
        <MuteButton muted={muted} onClick={toggleMute} size="desktop" />
      </div>
    </>
  );
}
