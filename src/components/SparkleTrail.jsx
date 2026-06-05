import { useEffect, useState } from "react";

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) return; // Reduce frequency

      const id = Date.now();
      const newSparkle = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      };

      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="animate-sparkle-trail absolute text-[#b38b1a] opacity-60"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
