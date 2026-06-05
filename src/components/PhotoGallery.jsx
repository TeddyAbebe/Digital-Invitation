import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Camera } from "lucide-react";

import img1 from "/images/kalkidan-scroll.jpg";
import img2 from "/images/kalkidan-toss.png";
import img3 from "/images/kalkidan-studio-scroll.jpg";
import img4 from "/images/kalkidan-hero.png";

const photos = [
  { url: img1, title: "A New Chapter" },
  { url: img2, title: "The Joy of Success" },
  { url: img3, title: "Kalkidan Temesgen" },
  { url: img4, title: "Official Portrait" },
];

function Photo({ url, title }) {
  return (
    <div className="absolute inset-[10px] sm:inset-[20px] overflow-hidden bg-white shadow-sm flex items-center justify-center">
      <img
        src={url}
        alt={title}
        className="block h-full w-full object-cover select-none pointer-events-none"
        draggable="false"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
        <p className="font-[family-name:var(--font-body)] text-[9px] sm:text-[10px] italic tracking-widest text-white uppercase truncate">
          {title}
        </p>
      </div>
    </div>
  );
}

// A single page that can be flat or half-angled
function Page({ photo, side, angle = 0, zIndex = 1 }) {
  const isLeft = side === "left";
  const posClass = isLeft ? "right-1/2 rounded-l-sm" : "left-1/2 rounded-r-sm";
  const origin = isLeft ? "right center" : "left center";

  return (
    <div
      className={`vintage-paper absolute top-0 ${posClass} h-full w-[49.5%] border-black/10 preserve-3d transition-transform duration-1000 ease-in-out`}
      style={{
        transform: `rotateY(${angle}deg)`,
        transformOrigin: origin,
        zIndex: zIndex,
      }}
    >
      {photo && <Photo url={photo.url} title={photo.title} />}
      {/* Spine depth shadow */}
      <div
        className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} h-full w-8 bg-gradient-to-${isLeft ? "l" : "r"} from-black/20 to-transparent pointer-events-none`}
      />
    </div>
  );
}

export default function PhotoGallery() {
  const [page, setPage] = useState(0);
  const total = photos.length;

  const next = () => setPage((p) => (p + 1) % (total / 2 + 1));

  // 0: cover closed
  // 1: spread 1 (photos 0, 1)
  // 2: spread 2 (photos 2, 3)

  return (
    <section
      id="gallery"
      className="relative z-10 px-4 py-24 sm:py-40 overflow-hidden bg-[#faf7f2]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          icon={Camera}
          title="Interactive Album"
          subtitle="Click the album to flip the pages"
        />

        <div className="perspective-2000 mt-12 flex justify-center">
          <div
            className="group relative h-[300px] w-full max-w-[900px] sm:h-[500px] preserve-3d cursor-pointer"
            style={{ transform: "rotateX(20deg)" }}
            onClick={next}
          >
            {/* Hardcover Back */}
            <div className="absolute left-1/2 top-1/2 h-[105%] w-[102%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#1a0f00] shadow-[0_40px_100px_rgba(0,0,0,0.5)]" />

            {/* Spine Valley Recess */}
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-black/40 z-[50]" />

            {/* Static Content (Photos behind flipping pages) */}
            <Page
              side="left"
              photo={page >= 1 ? photos[0] : null}
              angle={page >= 1 ? -15 : 0}
              zIndex={10}
            />
            <Page
              side="right"
              photo={page >= 2 ? photos[3] : photos[1]}
              angle={page >= 1 ? 15 : 0}
              zIndex={5}
            />

            {/* Flipping Page 1 (Front: Photo 1, Back: Photo 2) */}
            <div
              className="absolute top-0 left-1/2 h-full w-[49.5%] origin-left preserve-3d transition-transform duration-1000 ease-in-out z-[20]"
              style={{ transform: `rotateY(${page >= 2 ? -165 : 15}deg)` }}
            >
              {/* Front (Right side initially) */}
              <div className="backface-hidden absolute inset-0 vintage-paper rounded-r-sm border-l border-black/10">
                <Photo url={photos[1].url} title={photos[1].title} />
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
              {/* Back (Left side after flip) */}
              <div className="backface-hidden absolute inset-0 vintage-paper rounded-l-sm border-r border-black/10 rotate-y-180">
                <Photo url={photos[2].url} title={photos[2].title} />
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent" />
              </div>
            </div>

            {/* Fanned Page Decoration (Left) */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="vintage-paper absolute top-0 right-1/2 h-full w-[49.5%] origin-right opacity-30"
                style={{
                  transform: `rotateY(${-15 - i * 3}deg) translateZ(${-i * 10}px)`,
                  zIndex: 1,
                }}
              />
            ))}
            {/* Fanned Page Decoration (Right) */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="vintage-paper absolute top-0 left-1/2 h-full w-[49.5%] origin-left opacity-30"
                style={{
                  transform: `rotateY(${15 + i * 3}deg) translateZ(${-i * 10}px)`,
                  zIndex: 1,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-[10px] tracking-widest text-[#b38b1a] uppercase opacity-40 animate-pulse">
          Click to flip pages
        </div>
      </div>
    </section>
  );
}
