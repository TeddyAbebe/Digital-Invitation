import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { Camera, GraduationCap } from "lucide-react";

import img1 from "/images/kalkidan-scroll.jpg";
import img2 from "/images/kalkidan-toss.png";
import img3 from "/images/kalkidan-studio-scroll.jpg";
import img4 from "/images/kalkidan-hero.png";

/* 
   Data
7 */
const photos = [
  { url: img1, title: "A New Chapter" },
  { url: img2, title: "The Joy of Success" },
  { url: img3, title: "Kalkidan Temesgen" },
  { url: img4, title: "Official Portrait" },
];

// 4 photos shown 3Ã— each = 6 photo spreads + 1 Bible-quote end page = 7 spreads total
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
const NUM_FLIPS = NUM_SPREADS; // 7 flips (last flip k=6 bridges Spread 7 to Back Cover closed state)
const MAX_PAGE = NUM_SPREADS + 1; // 8 (page 8 is closed back cover state)

const BIBLE_QUOTES = [
  {
    text: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
  },
];

/* -----------------------------------------
   Sub-components
----------------------------------------- */
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
      <div className="text-[#b38b1a] text-xs sm:text-sm tracking-widest font-serif opacity-75">
        {"\u2726 \u2726 \u2726"}
      </div>
      <blockquote className="space-y-4 max-w-[85%]">
        <p className="font-[family-name:var(--font-display)] text-sm sm:text-xl md:text-2xl font-bold italic text-[#1a1a1a] leading-relaxed tracking-wide">
          "{quote.text}"
        </p>
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#b38b1a] to-transparent mx-auto my-2" />
        <cite className="block text-[8px] sm:text-[11px] tracking-[0.25em] text-[#b38b1a] uppercase not-italic font-semibold font-[family-name:var(--font-sans)]">
          {"\u2014"} {quote.ref}
        </cite>
      </blockquote>
      <div className="text-[#b38b1a] text-xs sm:text-sm tracking-widest font-serif opacity-75">
        {"\u2726 \u2726 \u2726"}
      </div>
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
  if (spread.isEndPage)
    return side === "left" ? <EndPageLeft /> : <EndPageRight />;
  const photo = side === "left" ? spread.left : spread.right;
  return photo ? <Photo url={photo.url} title={photo.title} /> : null;
}

/* 
   Main component
 */
export default function PhotoGallery() {
  const [page, setPage] = useState(0);
  const [stablePage, setStablePage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const sectionRef = useRef(null);
  const animTimerRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const dragStartXRef = useRef(null);

  const ANIM_MS = 2500; // slow-motion flip duration

  const goNext = () => {
    const targetPage = Math.min(page + 1, MAX_PAGE);
    if (targetPage === page) return;

    if (isAnimating) {
      setStablePage(page);
    }

    setIsAnimating(true);
    setPage(targetPage);
    clearTimeout(animTimerRef.current);
    animTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      setStablePage(targetPage);
    }, ANIM_MS);
  };
  const goPrev = () => {
    const targetPage = Math.max(page - 1, 0);
    if (targetPage === page) return;

    if (isAnimating) {
      setStablePage(page);
    }

    setIsAnimating(true);
    setPage(targetPage);
    clearTimeout(animTimerRef.current);
    animTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      setStablePage(targetPage);
    }, ANIM_MS);
  };

  const openAlbum = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    if (page === 0) goNext();
  };
  const stopBookDrag = (e) => e.stopPropagation();

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
          setStablePage(0);
          setIsAnimating(false);
          setIsEnlarged(false);
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(animTimerRef.current), []);

  /* Drag / touch handlers */
  const startDrag = (x) => {
    if (!isAnimating) {
      setIsDragging(true);
      dragStartXRef.current = x;
      dragOffsetRef.current = 0;
      setDragStartX(x);
      setDragOffset(0);
    }
  };
  const moveDrag = (x) => {
    if (dragStartXRef.current == null) return;
    const offset = x - dragStartXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  };
  const endDrag = () => {
    if (dragStartXRef.current == null) return;
    const offset = dragOffsetRef.current;
    dragStartXRef.current = null;
    dragOffsetRef.current = 0;
    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
    if (offset < -80) goNext();
    else if (offset > 80) goPrev();
  };

  const handleDragStart = (e) => {
    if (e.target.closest("[data-book-interactive]")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startDrag(e.clientX);
  };
  const handleDragMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveDrag(e.clientX);
  };
  const handleDragEnd = (e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    endDrag();
  };

  /* Clamped ratio [-1, 1] */
  const cr = Math.max(-1, Math.min(1, dragOffset / 300));

  /* Cover / board angles */
  let coverAngle =
    page === 0
      ? isDragging && cr < 0
        ? cr * 165
        : 0
      : page === 1 && isDragging && cr > 0
        ? -165 + cr * 165
        : -165;

  let leftBoardAngle = page === 0 ? 180 : page === MAX_PAGE ? 0 : -15;
  let rightBoardAngle = page === 0 ? 0 : page === MAX_PAGE ? -180 : 15;

  if (isDragging) {
    if (page === 0 && cr < 0) {
      leftBoardAngle = 180 + cr * 195;
      rightBoardAngle = -cr * 15;
    } else if (page === 1 && cr > 0) {
      leftBoardAngle = -15 + cr * 195;
      rightBoardAngle = 15 - cr * 15;
    } else if (page === MAX_PAGE - 1 && cr < 0) {
      leftBoardAngle = -15 - cr * 15;
      rightBoardAngle = 15 + cr * 195;
    } else if (page === MAX_PAGE && cr > 0) {
      leftBoardAngle = cr * -15;
      rightBoardAngle = -180 + cr * 195;
    }
  }

  let txVal = 0;
  if (page === 0) {
    txVal = isDragging && cr < 0 ? -25 + -cr * 25 : -25;
  } else if (page === 1 && isDragging && cr > 0) {
    txVal = cr * -25;
  } else if (page === MAX_PAGE) {
    txVal = isDragging && cr > 0 ? 25 - cr * 25 : 25;
  } else if (page === MAX_PAGE - 1 && isDragging && cr < 0) {
    txVal = -cr * 25;
  }

  /* ── Flip-element helpers ── */
  const getFlipAngle = (k) => {
    const flipped = page >= k + 2;
    let angle = flipped ? -165 : 15;
    if (isDragging) {
      if (page === k + 1 && cr < 0) angle = 15 + cr * 180;
      if (page === k + 2 && cr > 0) angle = -165 + cr * 180;
    }
    return angle;
  };

  /**
   * Z-index for flip element k.
   * The "active" flip (currently in motion) gets highest priority so it
   * sweeps over everything else without clipping.
   */
  const getFlipZ = (k) => {
    const activeK = isAnimating ? Math.min(stablePage, page) - 1 : -1;
    if (k === activeK) return 200;
    // Normal stacking: unflipped pages highest on right, flipped highest on left
    return page >= k + 2 ? 10 + k : 10 + NUM_FLIPS - k;
  };

  /* ── Shared values ── */
  const leftPage = isAnimating && page > stablePage ? stablePage : page;
  const rightPage = isAnimating && page < stablePage ? stablePage : page;
  const coverZ =
    page === 0 || (isAnimating && Math.min(stablePage, page) === 0) ? 200 : 2;
  const tc = isDragging ? "transition-none" : "book-flip-transition";
  const cursor = isDragging ? "cursor-grabbing" : "cursor-grab";
  const fanOpacity = page === 0 || page === MAX_PAGE ? 0 : 0.3;
  const coverClosed = page === 0;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 px-4 py-24 sm:py-40 overflow-hidden bg-[#faf7f2]"
    >
      <div className="mx-auto max-w-7xl select-none">
        <SectionHeader icon={Camera} title="Graduation Album" />

        {/* Interactive arrows + 3-D book container */}
        <Reveal variant="scale" delay={250} duration={850}>
          <div className="relative mt-8 sm:mt-12 flex justify-center items-center w-full max-w-[1050px] mx-auto overflow-visible px-4 pr-12 sm:px-16 sm:pr-16">
            {/* Floating Left Arrow */}
            {page > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-0 sm:left-2 z-40 w-7 h-7 sm:w-12 sm:h-12 rounded-full border border-[#b38b1a]/40 sm:border-2 bg-[#fdfbf7]/80 sm:bg-[#fdfbf7]/90 hover:bg-[#b38b1a] hover:text-white text-[#b38b1a] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 opacity-70 sm:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-5 sm:h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* 3-D book */}
            <div className="perspective-2000 w-full flex justify-center">
              <div
                className={`relative overflow-visible h-[210px] xs:h-[260px] sm:h-[500px] w-full max-w-[900px] preserve-3d touch-none ${cursor} ${tc}`}
                style={{
                  transform: `rotateX(20deg) translateX(${txVal}%) scale(${isEnlarged ? 1.14 : 1})`,
                }}
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
                onPointerLeave={handleDragEnd}
              >
                {/* ── Hardcover back boards ── */}
                <div
                  className={`pointer-events-none absolute right-1/2 top-[-2.5%] h-[105%] w-[50.5%] origin-right rounded-l-sm bg-gradient-to-bl from-[#1e293b] to-[#0f172a] border-y border-l border-[#b38b1a]/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backface-hidden ${tc}`}
                  style={{
                    transform: `rotateY(${leftBoardAngle}deg)`,
                    zIndex: 1,
                  }}
                />
                <div
                  className={`pointer-events-none absolute left-1/2 top-[-2.5%] h-[105%] w-[50.5%] origin-left rounded-r-sm bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-y border-r border-[#b38b1a]/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)] ${tc}`}
                  style={{
                    transform: `rotateY(${rightBoardAngle}deg)`,
                    zIndex: 1,
                  }}
                />

                {/* ── Spine ── */}
                <div
                  className="absolute left-1/2 top-[-2.5%] h-[105%] w-2 -translate-x-1/2 bg-gradient-to-r from-black/60 to-black/30 rounded-sm pointer-events-none"
                  style={{ zIndex: 150 }}
                />

                {/*
                ── Per-spread LEFT pages (static, always correct) ──
                Each spread[k] renders its left-side content as a flat page
                pinned at z=6+k. When the flip card for spread k sweeps left,
                it reveals this page underneath — no content jump.
              */}
                {spreads.map((spread, k) => {
                  // Only render when the book is open and this page can be visible
                  if (leftPage < 1 || leftPage >= MAX_PAGE) return null;
                  // Only visible once spread k has been "reached" (page >= k+2 means
                  // the flip-k is fully on left, exposing this left page)
                  // We render it a bit earlier so it's ready before the flip lands
                  if (leftPage < k + 1) return null;
                  return (
                    <div
                      key={`left-${k}`}
                      className="pointer-events-none vintage-paper absolute top-0 right-1/2 rounded-l-sm h-full w-[49.5%] backface-hidden"
                      style={{
                        transform: "rotateY(-15deg)",
                        transformOrigin: "right center",
                        zIndex: 6 + k,
                      }}
                    >
                      <SpreadContent spread={spread} side="left" />
                      <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/*
                ── Per-spread RIGHT pages (static, always correct) ──
                The right side of spread k is permanently anchored at z=6+k.
                The flip card (which carries the same content on its front face)
                sits on top until it flips away; after that, this static page
                is exposed and its content is already correct.
              */}
                {spreads.map((spread, k) => {
                  if (rightPage < 1 || rightPage >= MAX_PAGE) return null;
                  // Render right page of spread k as long as we're viewing this spread or beyond
                  if (rightPage < k + 1) return null;
                  return (
                    <div
                      key={`right-${k}`}
                      className="pointer-events-none vintage-paper absolute top-0 left-1/2 rounded-r-sm h-full w-[49.5%] backface-hidden"
                      style={{
                        transform: "rotateY(15deg)",
                        transformOrigin: "left center",
                        zIndex: 6 + k,
                      }}
                    >
                      <SpreadContent spread={spread} side="right" />
                      <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/* ── Flip elements (one per spread-to-spread transition) ── */}
                {Array.from({ length: NUM_FLIPS }, (_, k) => {
                  const spread = spreads[k];
                  const nextSpread = spreads[k + 1];

                  return (
                    <div
                      key={k}
                      className={`pointer-events-none absolute top-0 left-1/2 h-full w-[49.5%] origin-left preserve-3d ${tc}`}
                      style={{
                        transform: `rotateY(${getFlipAngle(k)}deg)`,
                        zIndex: getFlipZ(k),
                      }}
                    >
                      {/* Front face: right page of spread k */}
                      <div className="backface-hidden absolute inset-0 vintage-paper rounded-r-sm border-l border-black/10">
                        {spread?.isEndPage ? (
                          <EndPageRight />
                        ) : (
                          spread?.right && (
                            <Photo
                              url={spread.right.url}
                              title={spread.right.title}
                            />
                          )
                        )}
                        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                      </div>

                      {/* Back face: left page of spread k+1 OR back cover if final flip */}
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
                            data-book-interactive
                            onClick={(e) => {
                              e.stopPropagation();
                              setPage(0);
                              setStablePage(0);
                              setIsAnimating(false);
                            }}
                            onTouchEnd={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setPage(0);
                              setStablePage(0);
                              setIsAnimating(false);
                            }}
                            className="pointer-events-auto relative z-[350] overflow-hidden group mb-4 px-5 py-2 sm:px-8 sm:py-3 rounded-full text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]"
                            style={{
                              background:
                                "linear-gradient(135deg, #8a6f1a 0%, #d4af37 50%, #8a6f1a 100%)",
                              backgroundSize: "200% 100%",
                            }}
                          >
                            <span
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                                animation:
                                  "btn-shimmer 1.2s ease-in-out infinite",
                              }}
                            />
                            <span className="absolute inset-[2px] rounded-full border border-white/20 pointer-events-none" />
                            <span className="relative flex items-center gap-2">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:rotate-[360deg]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M4 4v5h.582M20 20v-5h-.581M4.582 9a8 8 0 0115.356 2M19.418 15a8 8 0 01-15.356-2"
                                />
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
                            nextSpread?.left && (
                              <Photo
                                url={nextSpread.left.url}
                                title={nextSpread.left.title}
                              />
                            )
                          )}
                          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* ── Front Cover ── */}
                <div
                  className={`pointer-events-none absolute top-0 left-1/2 h-full w-[49.5%] origin-left preserve-3d ${tc}`}
                  style={{
                    transform: `rotateY(${coverAngle}deg)`,
                    zIndex: coverZ,
                  }}
                >
                  {/* Cover face */}
                  <div className="pointer-events-none backface-hidden overflow-visible absolute inset-0 rounded-r-sm bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-2 border-[#b38b1a] p-4 sm:p-8 flex flex-col items-center justify-between text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8),0_15px_35px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-1.5 sm:inset-3 border border-[#b38b1a]/40 rounded-sm pointer-events-none" />
                    <div className="absolute inset-2 sm:inset-4 border border-[#b38b1a]/20 rounded-sm pointer-events-none" />
                    <div className="absolute top-3 left-3 text-[#b38b1a]/40 text-xs sm:text-sm">
                      {"\u2726"}
                    </div>
                    <div className="absolute top-3 right-3 text-[#b38b1a]/40 text-xs sm:text-sm">
                      {"\u2726"}
                    </div>
                    <div className="absolute bottom-3 left-3 text-[#b38b1a]/40 text-xs sm:text-sm">
                      {"\u2726"}
                    </div>
                    <div className="absolute bottom-3 right-3 text-[#b38b1a]/40 text-xs sm:text-sm">
                      {"\u2726"}
                    </div>

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

                    {/* Ribbon + bow - straddle the cover edge, click to open */}
                    {coverClosed && (
                      <button
                        type="button"
                        data-book-interactive
                        onClick={openAlbum}
                        onPointerDown={stopBookDrag}
                        onMouseDown={stopBookDrag}
                        onTouchStart={stopBookDrag}
                        aria-label="Open graduation album"
                        className="ribbon-trigger group/ribbon pointer-events-auto absolute top-0 right-0 z-[250] h-full w-12 translate-x-1/2 cursor-pointer border-0 bg-transparent p-0 sm:w-16"
                      >
                        <span className="ribbon-strip" aria-hidden="true">
                          <span className="ribbon-strip-core" />
                          <span className="ribbon-strip-shimmer" />
                          <span className="ribbon-strip-crease" />
                        </span>

                        <div className="ribbon-bow" aria-hidden="true">
                          <span className="ribbon-sparkle ribbon-sparkle-a" />
                          <span className="ribbon-sparkle ribbon-sparkle-b" />
                          <div className="ribbon-bow-loop ribbon-bow-loop--left" />
                          <div className="ribbon-bow-loop ribbon-bow-loop--right" />
                          <div className="ribbon-bow-tail ribbon-bow-tail--left" />
                          <div className="ribbon-bow-tail ribbon-bow-tail--right" />
                          <div className="ribbon-bow-knot" />
                        </div>
                      </button>
                    )}

                  </div>

                  {/* Inside front cover lining */}
                  <div className="backface-hidden absolute inset-0 vintage-paper rounded-l-sm border-r border-black/15 rotate-y-180 flex flex-col items-center justify-center p-6 text-center">
                    <div className="absolute inset-4 border border-[#b38b1a]/25 rounded-sm pointer-events-none" />
                    <div className="max-w-[80%] space-y-4">
                      <span className="text-[#b38b1a] text-lg font-serif">
                        {"\u2726"}
                      </span>
                      <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm italic text-[#1a1a1a]/95 font-medium leading-relaxed">
                        "The future belongs to those who believe in the beauty of their dreams."
                      </p>
                      <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-widest text-[#b38b1a] uppercase">
                        Kalkidan Temesgen
                      </p>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Fanned page decorations */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={`fl-${i}`}
                    className={`pointer-events-none vintage-paper absolute top-0 right-1/2 h-full w-[49.5%] origin-right ${tc}`}
                    style={{
                      transform: `rotateY(${page === 0 ? 180 : page === MAX_PAGE ? 0 : -15 - i * 3}deg) translateZ(${-i * 10}px)`,
                      zIndex: 1,
                      opacity: fanOpacity,
                    }}
                  />
                ))}
                {[1, 2, 3].map((i) => (
                  <div
                    key={`fr-${i}`}
                    className={`pointer-events-none vintage-paper absolute top-0 left-1/2 h-full w-[49.5%] origin-left ${tc}`}
                    style={{
                      transform: `rotateY(${page === 0 ? 0 : page === MAX_PAGE ? -180 : 15 + i * 3}deg) translateZ(${-i * 10}px)`,
                      zIndex: 1,
                      opacity: fanOpacity,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Right Arrow */}
            {page > 0 && page < MAX_PAGE && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-0 sm:right-2 z-40 w-7 h-7 sm:w-12 sm:h-12 rounded-full border border-[#b38b1a]/40 sm:border-2 bg-[#fdfbf7]/80 sm:bg-[#fdfbf7]/90 hover:bg-[#b38b1a] hover:text-white text-[#b38b1a] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 opacity-70 sm:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-5 sm:h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Progress dots */}
          {page > 0 && page < MAX_PAGE && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: NUM_SPREADS }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    page === i + 1
                      ? "w-4 h-2 bg-[#b38b1a]"
                      : "w-2 h-2 bg-[#b38b1a]/25"
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
