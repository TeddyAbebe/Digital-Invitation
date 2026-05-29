import { useEffect, useState } from 'react'

const links = [
  { href: '#details', label: 'Details' },
  { href: '#location', label: 'Location' },
  { href: '#wishes', label: 'Wishes' },
]

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-[#c9a227]/25 bg-[#0a0f1a]/85 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:gap-2 sm:px-3">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-3 py-1.5 font-[family-name:var(--font-sans)] text-xs tracking-wide text-[#f7f0e3]/70 transition hover:bg-[#c9a227]/15 hover:text-[#e8d48b] sm:px-4 sm:text-sm"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
