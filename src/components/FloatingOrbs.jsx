export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="orb orb-1 magic-blob" />
      <div className="orb orb-2 magic-blob" />
      <div className="orb orb-3 magic-blob" />
    </div>
  );
}
