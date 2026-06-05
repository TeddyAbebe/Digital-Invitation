import { useEffect, useState } from "react";

const links = [
  { href: "#details", label: "Details" },
  { href: "#location", label: "Location" },
  { href: "#wishes", label: "Wishes" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-[#b38b1a]/25 bg-[#ffffff]/85 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:gap-2 sm:px-3">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-3 py-1.5 font-[family-name:var(--font-sans)] text-xs tracking-wide text-[#1a1a1a]/70 transition hover:bg-[#b38b1a]/15 hover:text-[#b38b1a] sm:px-4 sm:text-sm"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
