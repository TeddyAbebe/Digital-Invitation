import { useState } from 'react'

const COLORS = ['#c9a227', '#e8d48b', '#f7f0e3', '#d4af37']

function createPieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 6,
  }))
}

export default function Confetti({ count = 22 }) {
  const [pieces] = useState(() => createPieces(count))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece rounded-full opacity-50"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: p.color,
            width: p.size,
            height: p.size * 1.6,
          }}
        />
      ))}
    </div>
  )
}
