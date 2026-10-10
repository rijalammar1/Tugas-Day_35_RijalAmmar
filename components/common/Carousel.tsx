"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

/* Default: 1 card (85%) di HP, 2 di tablet, 3 di desktop.
   Harus string literal utuh biar kebaca Tailwind. */
const DEFAULT_ITEM_CLASS =
  "w-[85%] md:w-[calc((100%_-_var(--carousel-gap))_/_2)] lg:w-[calc((100%_-_2_*_var(--carousel-gap))_/_3)]";

/* Track: card muncul bergantian */
const trackVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const arrowButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-lime-400/60 hover:text-lime-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-700 disabled:hover:text-gray-400 cursor-pointer";

type CarouselProps<T> = {
  items: T[];
  /** Key unik tiap item */
  getKey: (item: T, index: number) => string;
  /** Isi tiap card. Root elemennya otomatis melebar dan setinggi card lain */
  renderItem: (item: T, index: number) => ReactNode;
  /** Label buat screen reader */
  ariaLabel: string;
  /** Opsional, judul section di kiri. Tombol panah ada di kanannya */
  header?: ReactNode;
  /** Class lebar tiap card. Pakai var(--carousel-gap) buat hitung jarak */
  itemClassName?: string;
  /** Jarak antar card dalam px */
  gap?: number;
  /** Class untuk baris header (default kasih jarak ke bawah) */
  headerClassName?: string;
  className?: string;
};

export default function Carousel<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  header,
  itemClassName = DEFAULT_ITEM_CLASS,
  gap = 24,
  headerClassName = "mb-12",
  className = "",
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Hitung ulang status panah saat ukuran track atau jumlah item berubah
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateArrows();

    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows, items.length]);

  const scrollByItem = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const first = el.firstElementChild as HTMLElement | null;
    const columnGap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first ? first.offsetWidth + columnGap : el.clientWidth;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    el.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Panah disembunyiin kalau semua item sudah muat tanpa perlu digeser
  const scrollable = canPrev || canNext;

  return (
    <MotionConfig reducedMotion="user">
      <div className={className}>
        {(header || scrollable) && (
          <div
            className={`flex items-end justify-between gap-6 ${headerClassName}`}
          >
            {header}

            {scrollable && (
              <div className="ml-auto flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => scrollByItem(-1)}
                  disabled={!canPrev}
                  aria-label="Previous"
                  className={arrowButton}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => scrollByItem(1)}
                  disabled={!canNext}
                  aria-label="Next"
                  className={arrowButton}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Track: satu baris, bisa digeser, berhenti pas di tepi card */}
        <motion.div
          ref={trackRef}
          onScroll={updateArrows}
          variants={trackVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          role="region"
          aria-label={ariaLabel}
          tabIndex={0}
          style={
            {
              "--carousel-gap": `${gap}px`,
              gap: "var(--carousel-gap)",
            } as CSSProperties
          }
          className="flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <motion.div
              key={getKey(item, index)}
              variants={itemVariants}
              className={`flex shrink-0 snap-start [&>*]:w-full ${itemClassName}`}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
