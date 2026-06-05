import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export default function FloatingCaps() {
  const [caps, setCaps] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newCap = {
        id,
        left: `${Math.random() * 90 + 5}%`,
        duration: `${Math.random() * 3 + 5}s`,
        size: Math.random() * 20 + 30,
        delay: Math.random() * 2,
      };

      setCaps((prev) => [...prev, newCap]);

      // Cleanup cap after animation ends
      setTimeout(() => {
        setCaps((prev) => prev.filter((c) => c.id !== id));
      }, 7000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {caps.map((cap) => (
        <div
          key={cap.id}
          className="animate-cap-toss absolute bottom-0"
          style={{
            left: cap.left,
            animationDuration: cap.duration,
            animationDelay: `${cap.delay}s`,
          }}
        >
          <GraduationCap
            size={cap.size}
            className="text-[#b38b1a] opacity-40 shadow-xl"
            strokeWidth={1}
          />
        </div>
      ))}
    </div>
  );
}
