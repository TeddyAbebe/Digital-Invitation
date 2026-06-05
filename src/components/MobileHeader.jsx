import { AudioControls, useIsMobile } from "./AudioPlayer";
import FloatingNav from "./FloatingNav";

const RADIUS = "1rem"; /* matches rounded-2xl */
const INNER_RADIUS = "calc(1rem - 4px)";
const TRACK = "bg-[#b38b1a]/15";
const FILL =
  "bg-gradient-to-r from-[#b38b1a] via-[#e5c158] to-[#b38b1a] shadow-[0_1px_10px_rgba(201,162,39,0.4)]";

function progressEndRadius(progress) {
  if (progress >= 99) {
    return { borderTopRightRadius: RADIUS };
  }
  if (progress > 0) {
    return { borderBottomRightRadius: "4px", borderTopRightRadius: "2px" };
  }
  return {};
}

export default function MobileHeader({ scrollProgress = 0 }) {
  const isMobile = useIsMobile();
  const endRadius = progressEndRadius(scrollProgress);

  if (!isMobile) return null;

  return (
    <header className="fixed top-0 right-0 left-0 z-[60] overflow-visible px-3">
      {/* 4px gutter track — rounded on all corners */}
      <div
        className={`relative overflow-visible rounded-2xl ${TRACK} p-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)]`}
      >
        {/* Clip progress to the header's curved outline */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
          <div
            className={`absolute top-0 left-0 h-1 ${FILL} transition-all duration-75 ease-out`}
            style={{
              width: `${scrollProgress}%`,
              borderTopLeftRadius: RADIUS,
              ...endRadius,
            }}
          />
        </div>

        <div
          className="relative overflow-visible bg-white/20 backdrop-blur-2xl backdrop-saturate-150"
          style={{ borderRadius: INNER_RADIUS }}
        >
          <div className="flex items-center gap-2 overflow-visible px-2.5 py-1.5">
            <AudioControls embedded />
            <FloatingNav embedded />
          </div>
        </div>
      </div>
    </header>
  );
}
