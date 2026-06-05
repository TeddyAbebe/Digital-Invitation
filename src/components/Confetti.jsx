import { useEffect, useState } from "react";

const COLORS = ["#b38b1a", "#d4af37", "#ffffff", "#fef3c7"];

export default function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const duration = 6 + Math.random() * 6;

      const newPiece = {
        id,
        left: `${Math.random() * 100}%`,
        duration: `${duration}s`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
      };

      setPieces((prev) => [...prev.slice(-40), newPiece]); // Keep limit for performance
    }, 400); // Drop every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece rounded-full opacity-40 blur-[1px]"
          style={{
            left: p.left,
            animationDuration: p.duration,
            backgroundColor: p.color,
            width: p.size,
            height: p.size * 1.5,
          }}
        />
      ))}
    </div>
  );
}
