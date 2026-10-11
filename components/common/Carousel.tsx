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

/* Lebar satu langkah geser: lebar card + jarak antar card */
function getStep(el: HTMLElement) {
  const first = el.firstElementChild as HTMLElement | null;
  const columnGap = parseFloat(getComputedStyle(el).columnGap) || 0;
  return first ? first.offsetWidth + columnGap : el.clientWidth;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
  /** Titik indikator di bawah carousel */
  showDots?: boolean;
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
  showDots = true,
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [count, setCount] = useState(1);
  const [index, setIndex] = useState(0);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = getStep(el);
    const maxScroll = el.scrollWidth - el.clientWidth;

    // Jumlah posisi geser yang beneran bisa dicapai
    const nextCount =
      maxScroll > 4 && step > 0 ? Math.ceil((maxScroll - 4) / step) + 1 : 1;

    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
    setCount(nextCount);
    setIndex(
      step > 0 ? Math.min(Math.round(el.scrollLeft / step), nextCount - 1) : 0,
    );
  }, []);

  // Hitung ulang saat ukuran track atau jumlah item berubah
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateState();

    const observer = new ResizeObserver(updateState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateState, items.length]);

  const scrollByItem = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction * getStep(el),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;

    el.scrollTo({
      left: i * getStep(el),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Panah dan titik disembunyiin kalau semua item sudah muat
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
          onScroll={updateState}
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
          {items.map((item, i) => (
            <motion.div
              key={getKey(item, i)}
              variants={itemVariants}
              className={`flex shrink-0 snap-start [&>*]:w-full ${itemClassName}`}
            >
              {renderItem(item, i)}
            </motion.div>
          ))}
        </motion.div>

        {/* Titik indikator: jumlahnya = posisi geser yang bisa dicapai */}
        {showDots && scrollable && count > 1 && (
          <div
            role="group"
            aria-label="Choose slide"
            className="mt-6 flex justify-center"
          >
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className="group cursor-pointer p-1.5"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-lime-400"
                      : "w-2 bg-gray-700 group-hover:bg-gray-500"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
