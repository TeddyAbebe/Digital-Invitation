export default function DecorativeBg() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 z-0 h-64 w-64 opacity-20"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at top left, rgba(201,162,39,0.35), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed right-0 bottom-0 z-0 h-80 w-80 opacity-15"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at bottom right, rgba(201,162,39,0.3), transparent 70%)',
        }}
      />
    </>
  )
}
