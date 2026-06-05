import { useEffect, useState } from "react";

const links = [
  { href: "#gallery", label: "Album" },
  { href: "#details", label: "Details" },
  { href: "#location", label: "Location" },
  { href: "#wishes", label: "Wishes" },
];

function NavLinks({ compact = false }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0.1 }
    );

    const targetIds = ["gallery", "details", "location", "wishes"];
    const elements = targetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      {links.map(({ href, label }) => {
        const isActive = activeSection === href;
        return (
          <a
            key={href}
            href={href}
            className={`shrink-0 rounded-full font-[family-name:var(--font-sans)] tracking-wide transition ${
              compact
                ? "px-2.5 py-1.5 text-xs"
                : "px-3 py-1.5 text-xs sm:px-4 sm:text-sm"
            } ${
              isActive
                ? "bg-[#b38b1a] text-white shadow-md"
                : "text-[#1a1a1a]/70 hover:bg-[#b38b1a]/15 hover:text-[#b38b1a]"
            }`}
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

export default function FloatingNav({ embedded = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (embedded) return;

    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [embedded]);

  if (embedded) {
    return (
      <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto">
        <NavLinks compact />
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-500 md:block ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-[#b38b1a]/25 bg-[#ffffff]/85 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:gap-2 sm:px-3">
        <NavLinks />
      </div>
    </nav>
  );
}
