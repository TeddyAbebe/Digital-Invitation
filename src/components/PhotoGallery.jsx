import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { Camera, GraduationCap } from "lucide-react";

import img1 from "/images/kalkidan-scroll.jpg";
import img2 from "/images/kalkidan-toss.png";
import img3 from "/images/kalkidan-studio-scroll.jpg";
import img4 from "/images/kalkidan-hero.png";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const photos = [
  { url: img1, title: "A New Chapter" },
  { url: img2, title: "The Joy of Success" },
  { url: img3, title: "Kalkidan Temesgen" },
  { url: img4, title: "Official Portrait" },
];

// 4 photos shown 3× each = 6 photo spreads + 1 Bible-quote end page = 7 spreads total
const spreads = [
  { left: photos[0], right: photos[1] },
  { left: photos[2], right: photos[3] },
  { left: photos[0], right: photos[1] },
  { left: photos[2], right: photos[3] },
  { left: photos[0], right: photos[1] },
  { left: photos[2], right: photos[3] },
  { isEndPage: true },
];

const NUM_SPREADS = spreads.length; // 7
const NUM_FLIPS   = NUM_SPREADS;     // 7 flips (last flip k=6 bridges Spread 7 to Back Cover closed state)
const MAX_PAGE    = NUM_SPREADS + 1; // 8 (page 8 is closed back cover state)

const BIBLE_QUOTES = [
  {
    text: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
  },
];

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
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

function EndPageLeft() {
  const quote = BIBLE_QUOTES[0];
  return (
    <div className="absolute inset-[10px] sm:inset-[24px] flex flex-col items-center justify-center text-center gap-4 sm:gap-6 p-4 sm:p-6 overflow-hidden">
      <div className="text-[#b38b1a] text-xs sm:text-sm tracking-widest font-serif opacity-75">✦ ✦ ✦</div>
      <blockquote className="space-y-4 max-w-[85%]">
        <p className="font-[family-name:var(--font-display)] text-sm sm:text-xl md:text-2xl font-bold italic text-[#1a1a1a] leading-relaxed tracking-wide">
          "{quote.text}"
        </p>
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#b38b1a] to-transparent mx-auto my-2" />
        <cite className="block text-[8px] sm:text-[11px] tracking-[0.25em] text-[#b38b1a] uppercase not-italic font-semibold font-[family-name:var(--font-sans)]">
          — {quote.ref}
        </cite>
      </blockquote>
      <div className="text-[#b38b1a] text-xs sm:text-sm tracking-widest font-serif opacity-75">✦ ✦ ✦</div>
    </div>
  );
}

function EndPageRight() {
  return (
    <div className="absolute inset-[10px] sm:inset-[24px] flex flex-col items-center justify-center text-center gap-3 sm:gap-6 p-3 sm:p-6 overflow-hidden">
      <div className="w-12 h-12 sm:w-24 sm:h-24 shrink-0 aspect-square rounded-full border-2 border-[#b38b1a]/30 flex items-center justify-center bg-[#fdfbf7] shadow-sm mb-2">
        <GraduationCap className="w-6 h-6 sm:w-12 sm:h-12 text-[#b38b1a] animate-float" />
      </div>
      <div className="space-y-2 sm:space-y-3">
        <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl text-[#1a1a1a] tracking-widest font-extrabold uppercase">
          The End
        </h3>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#b38b1a] to-transparent mx-auto" />
        <p className="font-[family-name:var(--font-body)] text-[9px] sm:text-xs text-[#b38b1a] uppercase tracking-[0.25em] font-medium">
          Thank you for celebrating with me!
        </p>
      </div>
      <div className="pt-4 space-y-1">
        <p className="font-[family-name:var(--font-sans)] text-[8px] sm:text-[9px] tracking-[0.3em] text-[#1a1a1a]/60 uppercase">
          Kalkidan Temesgen
        </p>
        <p className="text-[7px] sm:text-[8px] tracking-[0.3em] text-[#b38b1a]/60 uppercase">
          Class of 2026
        </p>
      </div>
    </div>
  );
}

/** Renders the correct content for a given spread + side */
function SpreadContent({ spread, side }) {
  if (!spread) return null;
  if (spread.isEndPage) return side === "left" ? <EndPageLeft /> : <EndPageRight />;
  const photo = side === "left" ? spread.left : spread.right;
  return photo ? <Photo url={photo.url} title={photo.title} /> : null;
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function PhotoGallery() {
  const [page, setPage]           = useState(0);
  const [prevPage, setPrevPage]   = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const sectionRef = useRef(null);

  const goNext = () => {
    setPrevPage(page);
    setPage((p) => Math.min(p + 1, MAX_PAGE));
  };
  const goPrev = () => {
    setPrevPage(page);
    setPage((p) => Math.max(p - 1, 0));
  };

  const openAlbum = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    if (page === 0) goNext();
  };

  const stopBookDrag = (e) => e.stopPropagation();

  /* Sync prevPage with page after transition finishes */
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevPage(page);
    }, 1000);
    return () => clearTimeout(timer);
  }, [page]);

  /* Reset enlarged state once book opens */
  useEffect(() => {
    if (page > 0) setIsEnlarged(false);
  }, [page]);

  /* Auto-close when scrolled away */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPage(0);
          setPrevPage(0);
          setIsEnlarged(false);
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Drag / touch handlers */
  const startDrag = (x) => { setIsDragging(true); setDragStartX(x); setDragOffset(0); };
  const moveDrag  = (x) => { if (isDragging) setDragOffset(x - dragStartX); };
  const endDrag   = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -80) goNext();
    else if (dragOffset > 80) goPrev();
    setDragStartX(null);
    setDragOffset(0);
  };

  /* Clamped ratio [-1, 1] */
  const cr = Math.max(-1, Math.min(1, dragOffset / 300));

  /* ── Cover / board angles ── */
  // Cover: angle 0 = closed (right side), -165 = open (swung to left)
  let coverAngle =
    page === 0
      ? (isDragging && cr < 0 ? cr * 165 : 0)
      : (page === 1 && isDragging && cr > 0 ? -165 + cr * 165 : -165);

  // Hardcover boards follow the opening/closing motion
  let leftBoardAngle  = page === 0 ? 180 : (page === MAX_PAGE ? 0 : -15);
  let rightBoardAngle = page === 0 ? 0   : (page === MAX_PAGE ? -180 : 15);
  
  if (isDragging) {
    if (page === 0 && cr < 0) {
      leftBoardAngle  = 180 + cr * 195;
      rightBoardAngle = -cr * 15;
    } else if (page === 1 && cr > 0) {
      leftBoardAngle  = -15 + cr * 195;
      rightBoardAngle = 15  - cr * 15;
    } else if (page === MAX_PAGE - 1 && cr < 0) {
      leftBoardAngle  = -15 - cr * 15;
      rightBoardAngle = 15  + cr * 195;
    } else if (page === MAX_PAGE && cr > 0) {
      leftBoardAngle  = cr * -15;
      rightBoardAngle = -180 + cr * 195;
    }
  }

  // Book X translation: -25% centers front cover, 0 when open, 25% centers back cover
  let txVal = 0;
  if (page === 0) {
    txVal = isDragging && cr < 0 ? -25 + (-cr * 25) : -25;
  } else if (page === 1 && isDragging && cr > 0) {
    txVal = cr * -25;
  } else if (page === MAX_PAGE) {
    txVal = isDragging && cr > 0 ? 25 - (cr * 25) : 25;
  } else if (page === MAX_PAGE - 1 && isDragging && cr < 0) {
    txVal = -cr * 25;
  }

  /* ── Flip-element helpers ── */
  /**
   * Flip element k (0-indexed) bridges spread k → spread k+1.
   * It starts on the right side (15°) and sweeps to the left (-165°)
   * when page reaches k+2.
   */
  const getFlipAngle = (k) => {
    const flipped = page >= k + 2;
    let angle = flipped ? -165 : 15;
    if (isDragging) {
      // forward drag: this element is the one about to flip
      if (page === k + 1 && cr < 0) angle = 15 + cr * 180;
      // backward drag: un-flip the most-recently-flipped element
      if (page === k + 2 && cr > 0) angle = -165 + cr * 180;
    }
    return angle;
  };

  const getFlipZ = (k) => {
    // If this element is currently flipping (in the air), give it the highest z-index
    if (page !== prevPage && k === Math.min(page, prevPage) - 1) {
      return 100;
    }
    return page >= k + 2 ? 10 + k : 10 + NUM_FLIPS - k;
  };

  /* ── Shared values ── */
  const tc      = isDragging ? "transition-none" : "transition-transform duration-1000 ease-in-out";
  const cursor  = isDragging ? "cursor-grabbing" : "cursor-grab";
  const fanOpacity    = (page === 0 || page === MAX_PAGE) ? 0 : 0.3;
  const coverClosed   = page === 0;
  // Determine which spreads to show on the static background pages to prevent flickering/glitching
  let leftSpread = null;
  let rightSpread = null;

  if (page === prevPage) {
    if (page >= 1 && page < MAX_PAGE) {
      leftSpread = spreads[page - 1];
      rightSpread = spreads[page - 1];
    }
  } else {
    const transitioningFromPage = Math.min(page, prevPage);
    if (transitioningFromPage >= 1 && transitioningFromPage < MAX_PAGE) {
      leftSpread = spreads[transitioningFromPage - 1];
    }
    const transitioningToPage = transitioningFromPage + 1;
    if (transitioningToPage >= 1 && transitioningToPage < MAX_PAGE) {
      rightSpread = spreads[transitioningToPage - 1];
    }
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 px-4 py-24 sm:py-40 overflow-hidden bg-[#faf7f2]"
    >
      <div className="mx-auto max-w-7xl select-none">
        <SectionHeader
          icon={Camera}
          title="Graduation Album"
        />

        {/* Interactive arrows + 3-D book container */}
        <Reveal variant="scale" delay={250} duration={850}>
          <div className="relative mt-8 sm:mt-12 flex justify-center items-center w-full max-w-[1050px] mx-auto overflow-visible px-4 pr-12 sm:px-16 sm:pr-16">
          
          {/* Floating Left Arrow */}
          {page > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-0 sm:left-2 z-40 w-7 h-7 sm:w-12 sm:h-12 rounded-full border border-[#b38b1a]/40 sm:border-2 bg-[#fdfbf7]/80 sm:bg-[#fdfbf7]/90 hover:bg-[#b38b1a] hover:text-white text-[#b38b1a] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 opacity-70 sm:opacity-100"
              aria-label="Previous page"
            >
              <span className="text-xs sm:text-base font-bold">◀</span>
            </button>
          )}

          {/* 3-D book */}
          <div className="perspective-2000 w-full flex justify-center">
            <div
              className={`relative overflow-visible h-[210px] xs:h-[260px] sm:h-[500px] w-full max-w-[900px] preserve-3d ${cursor} ${tc}`}
              style={{ transform: `rotateX(20deg) translateX(${txVal}%) scale(${isEnlarged ? 1.14 : 1})` }}
              onMouseDown={(e)  => startDrag(e.clientX)}
              onMouseMove={(e)  => moveDrag(e.clientX)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => e.touches.length === 1 && startDrag(e.touches[0].clientX)}
              onTouchMove={(e)  => moveDrag(e.touches[0].clientX)}
              onTouchEnd={endDrag}
            >

              {/* ── Hardcover back boards ── */}
              <div
                className={`absolute right-1/2 top-[-2.5%] h-[105%] w-[50.5%] origin-right rounded-l-sm bg-gradient-to-bl from-[#1e293b] to-[#0f172a] border-y border-l border-[#b38b1a]/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backface-hidden ${tc}`}
                style={{ transform: `rotateY(${leftBoardAngle}deg)`, zIndex: 1 }}
              />
              <div
                className={`absolute left-1/2 top-[-2.5%] h-[105%] w-[50.5%] origin-left rounded-r-sm bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-y border-r border-[#b38b1a]/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)] ${tc}`}
                style={{ transform: `rotateY(${rightBoardAngle}deg)`, zIndex: 1 }}
              />

              {/* ── Spine ── */}
              <div
                className="absolute left-1/2 top-[-2.5%] h-[105%] w-2 -translate-x-1/2 bg-gradient-to-r from-black/60 to-black/30 rounded-sm pointer-events-none"
                style={{ zIndex: 150 }}
              />

              {/* ── Static background pages (shows correct pages during transitions to avoid flickering) ── */}
              {(leftSpread || rightSpread) && (
                <>
                  {/* Left background page */}
                  <div
                    className="vintage-paper absolute top-0 right-1/2 rounded-l-sm h-full w-[49.5%] backface-hidden"
                    style={{ transform: "rotateY(-15deg)", transformOrigin: "right center", zIndex: 5 }}
                  >
                    <SpreadContent spread={leftSpread} side="left" />
                    <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                  </div>
                  {/* Right background page */}
                  <div
                    className="vintage-paper absolute top-0 left-1/2 rounded-r-sm h-full w-[49.5%] backface-hidden"
                    style={{ transform: "rotateY(15deg)", transformOrigin: "left center", zIndex: 5 }}
                  >
                    <SpreadContent spread={rightSpread} side="right" />
                    <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                  </div>
                </>
              )}

              {/* ── Flip elements (one per spread-to-spread transition) ── */}
              {Array.from({ length: NUM_FLIPS }, (_, k) => {
                const spread     = spreads[k];       // spread k
                const nextSpread = spreads[k + 1];   // spread k+1 (undefined if k=6)

                return (
                  <div
                    key={k}
                    className={`absolute top-0 left-1/2 h-full w-[49.5%] origin-left preserve-3d ${tc} ${coverClosed ? "pointer-events-none" : ""}`}
                    style={{ transform: `rotateY(${getFlipAngle(k)}deg)`, zIndex: getFlipZ(k) }}
                  >
                    {/* Front face: right page of spread k */}
                    <div className="backface-hidden absolute inset-0 vintage-paper rounded-r-sm border-l border-black/10">
                      {spread?.isEndPage ? (
                        <EndPageRight />
                      ) : (
                        spread?.right && <Photo url={spread.right.url} title={spread.right.title} />
                      )}
                      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Back face: left page of spread k+1 OR back cover if final page */}
                    {k === NUM_FLIPS - 1 ? (
                      <div className="backface-hidden absolute inset-0 rounded-l-sm bg-gradient-to-bl from-[#1e293b] to-[#0f172a] border-2 border-[#b38b1a] p-4 sm:p-8 flex flex-col items-center justify-between text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8),0_15px_35px_rgba(0,0,0,0.5)] rotate-y-180">
                        <div className="absolute inset-1.5 sm:inset-3 border border-[#b38b1a]/40 rounded-sm pointer-events-none" />
                        <div className="absolute inset-2 sm:inset-4 border border-[#b38b1a]/20 rounded-sm pointer-events-none" />
                        
                        <div className="text-[#b38b1a] text-[9px] sm:text-[11px] tracking-[0.25em] font-serif opacity-80 mt-4 uppercase">
                          Kalkidan Temesgen
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:gap-4 my-auto">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#b38b1a]/40 flex items-center justify-center bg-[#0d131f] shadow-lg">
                            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37] animate-float" />
                          </div>
                          <div className="space-y-1">
                            <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-2xl text-[#d4af37] tracking-wider leading-tight">
                              Congratulations!
                            </h2>
                            <p className="font-[family-name:var(--font-body)] text-[9px] sm:text-xs text-[#b38b1a]/90 tracking-[0.2em] uppercase">
                              Class of 2026
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPage(0);
                            setPrevPage(0);
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setPage(0);
                            setPrevPage(0);
                          }}
                          className="relative overflow-hidden group mb-4 px-5 py-2 sm:px-8 sm:py-3 rounded-full text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-white pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]"
                          style={{ background: 'linear-gradient(135deg, #8a6f1a 0%, #d4af37 50%, #8a6f1a 100%)', backgroundSize: '200% 100%' }}
                        >
                          {/* Shimmer overlay */}
                          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)', animation: 'btn-shimmer 1.2s ease-in-out infinite' }}
                          />
                          {/* Inner border */}
                          <span className="absolute inset-[2px] rounded-full border border-white/20 pointer-events-none" />
                          <span className="relative flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:rotate-[360deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582M20 20v-5h-.581M4.582 9a8 8 0 0115.356 2M19.418 15a8 8 0 01-15.356-2" />
                            </svg>
                            View Again
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="backface-hidden absolute inset-0 vintage-paper rounded-l-sm border-r border-black/10 rotate-y-180">
                        {nextSpread?.isEndPage ? (
                          <EndPageLeft />
                        ) : (
                          nextSpread?.left && <Photo url={nextSpread.left.url} title={nextSpread.left.title} />
                        )}
                        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Front Cover ── */}
              <div
                className={`absolute top-0 left-1/2 h-full w-[49.5%] origin-left preserve-3d ${tc}`}
                style={{
                  transform: `rotateY(${coverAngle}deg)`,
                  zIndex: (page === 0 || (page !== prevPage && Math.min(page, prevPage) === 0)) ? 100 : 2
                }}
              >
                {/* Cover face */}
                <div className="backface-hidden overflow-visible absolute inset-0 rounded-r-sm bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-2 border-[#b38b1a] p-4 sm:p-8 flex flex-col items-center justify-between text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8),0_15px_35px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-1.5 sm:inset-3 border border-[#b38b1a]/40 rounded-sm pointer-events-none" />
                  <div className="absolute inset-2 sm:inset-4 border border-[#b38b1a]/20 rounded-sm pointer-events-none" />
                  <div className="absolute top-3 left-3 text-[#b38b1a]/40 text-xs sm:text-sm">✦</div>
                  <div className="absolute top-3 right-3 text-[#b38b1a]/40 text-xs sm:text-sm">✦</div>
                  <div className="absolute bottom-3 left-3 text-[#b38b1a]/40 text-xs sm:text-sm">✦</div>
                  <div className="absolute bottom-3 right-3 text-[#b38b1a]/40 text-xs sm:text-sm">✦</div>

                  <div className="relative z-10 mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e8c84a] sm:mt-4 sm:text-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                    Class of 2026
                  </div>

                  <div className="flex flex-col items-center gap-3 sm:gap-5 my-auto">
                    <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 border-[#b38b1a]/40 flex items-center justify-center bg-[#0d131f] shadow-lg">
                      <GraduationCap className="w-6 h-6 sm:w-10 sm:h-10 text-[#d4af37] animate-float" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-3xl text-[#d4af37] tracking-wider leading-tight">
                        Kalkidan Temesgen
                      </h2>
                      <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e8c84a] sm:text-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                        Graduation Album
                      </p>
                    </div>
                  </div>


                  {/* Ribbon + bow — straddle the cover edge, click to open */}
                  {coverClosed && (
                    <button
                      type="button"
                      onClick={openAlbum}
                      onPointerDown={stopBookDrag}
                      onMouseDown={stopBookDrag}
                      onTouchStart={stopBookDrag}
                      aria-label="Open graduation album"
                      className="group/ribbon absolute top-0 right-0 z-[250] h-full w-12 translate-x-1/2 cursor-pointer border-0 bg-transparent p-0 sm:w-16"
                    >
                      {/* Vertical stripe — half on cover, half outside */}
                      <span className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-b from-[#b38b1a] via-[#e5c158] to-[#b38b1a] opacity-90 shadow-[0_0_8px_rgba(0,0,0,0.4)] transition duration-300 group-hover/ribbon:opacity-100 group-hover/ribbon:shadow-[0_0_14px_rgba(212,175,55,0.45)] sm:w-6" />
                      <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/30" />

                      {/* Bow centered on the edge */}
                      <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-500 group-hover/ribbon:scale-110 ribbon-sway sm:h-14 sm:w-14">
                        <div className="absolute right-[44%] top-[15%] h-6 w-6 origin-bottom-right -rotate-12 rounded-full border border-[#b38b1a] bg-[#d4af37] shadow-md sm:h-8 sm:w-8" />
                        <div className="absolute left-[44%] top-[15%] h-6 w-6 origin-bottom-left rotate-12 rounded-full border border-[#b38b1a] bg-[#d4af37] shadow-md sm:h-8 sm:w-8" />
                        <div className="absolute right-[48%] top-[45%] h-6 w-2.5 origin-top-right -rotate-30 rounded-b-xs border border-[#9a7b18] bg-[#b38b1a] sm:h-8 sm:w-3.5" />
                        <div className="absolute left-[48%] top-[45%] h-6 w-2.5 origin-top-left rotate-30 rounded-b-xs border border-[#9a7b18] bg-[#b38b1a] sm:h-8 sm:w-3.5" />
                        <div className="absolute z-10 h-4 w-4 rounded-full border-2 border-[#b38b1a] bg-gradient-to-br from-white via-[#d4af37] to-[#b38b1a] shadow-md sm:h-6 sm:w-6" />
                      </div>
                    </button>
                  )}

                  {/* Hand outside album — right of bow, points left */}
                  {coverClosed && (
                    <span
                      className="pointer-events-none absolute right-0 top-1/2 z-[260] translate-x-[calc(50%+2.75rem)] -translate-y-1/2 select-none text-2xl animate-hand-tap-left sm:translate-x-[calc(50%+3.5rem)] sm:text-4xl"
                      aria-hidden
                    >
                      👈
                    </span>
                  )}
                </div>

                {/* Inside front cover lining */}
                <div className="backface-hidden absolute inset-0 vintage-paper rounded-l-sm border-r border-black/15 rotate-y-180 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute inset-4 border border-[#b38b1a]/25 rounded-sm pointer-events-none" />
                  <div className="max-w-[80%] space-y-4">
                    <span className="text-[#b38b1a] text-lg font-serif">✦</span>
                    <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm italic text-[#1a1a1a]/70 leading-relaxed">
                      "The future belongs to those who believe in the beauty of their dreams."
                    </p>
                    <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-widest text-[#b38b1a] uppercase">
                      Kalkidan Temesgen
                    </p>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* ── Fanned page decorations (left & right stacks) ── */}
              {[1, 2, 3].map((i) => (
                <div
                  key={`fl-${i}`}
                  className={`vintage-paper absolute top-0 right-1/2 h-full w-[49.5%] origin-right ${tc} ${coverClosed ? "pointer-events-none" : ""}`}
                  style={{
                    transform: `rotateY(${page === 0 ? 180 : (page === MAX_PAGE ? 0 : -15 - i * 3)}deg) translateZ(${-i * 10}px)`,
                    zIndex: 1,
                    opacity: fanOpacity,
                  }}
                />
              ))}
              {[1, 2, 3].map((i) => (
                <div
                  key={`fr-${i}`}
                  className={`vintage-paper absolute top-0 left-1/2 h-full w-[49.5%] origin-left ${tc} ${coverClosed ? "pointer-events-none" : ""}`}
                  style={{
                    transform: `rotateY(${page === 0 ? 0 : (page === MAX_PAGE ? -180 : 15 + i * 3)}deg) translateZ(${-i * 10}px)`,
                    zIndex: 1,
                    opacity: fanOpacity,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Right Arrow — only visible when album is open */}
          {page > 0 && page < MAX_PAGE && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-0 sm:right-2 z-40 w-7 h-7 sm:w-12 sm:h-12 rounded-full border border-[#b38b1a]/40 sm:border-2 bg-[#fdfbf7]/80 sm:bg-[#fdfbf7]/90 hover:bg-[#b38b1a] hover:text-white text-[#b38b1a] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 opacity-70 sm:opacity-100"
              aria-label="Next page"
            >
              <span className="text-xs sm:text-base font-bold">▶</span>
            </button>
          )}

        </div>

        {/* Progress dots — below the album */}
        {page > 0 && page < MAX_PAGE && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: NUM_SPREADS }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  page === i + 1
                    ? 'w-4 h-2 bg-[#b38b1a]'
                    : 'w-2 h-2 bg-[#b38b1a]/25'
                }`}
              />
            ))}
          </div>
        )}
        </Reveal>
      </div>
    </section>
  );
}
