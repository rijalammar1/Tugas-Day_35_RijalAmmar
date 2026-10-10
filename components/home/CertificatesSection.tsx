"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";

import Carousel from "@/components/common/Carousel";
import { certificates, type Certificate } from "@/app/data/certificates";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

/* Semua halaman sertifikat: `pages` kalau ada, kalau nggak `image` */
function getPages(cert: Certificate): string[] {
  if (cert.pages && cert.pages.length > 0) return cert.pages;
  return cert.image ? [cert.image] : [];
}

/* Header: judul dulu, deskripsi nyusul */
const headerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* Tombol bulat di lightbox. Warna hex langsung, biar nggak ikut ke-remap di light mode */
const lightboxButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#525252] bg-[#0a0a0a]/60 text-[#ededed] transition-colors hover:border-[#a3e635] hover:text-[#a3e635] cursor-pointer";

/* Isi satu card sertifikat. Animasi masuk dan ukuran diurus Carousel */
function CertificateCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: (cert: Certificate) => void;
}) {
  const pages = getPages(cert);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-zinc-900/40 transition-colors hover:border-lime-400/40">
      {/* Bingkai gambar: padding seragam, sertifikat tampil utuh */}
      {pages.length > 0 ? (
        <button
          type="button"
          onClick={() => onOpen(cert)}
          aria-label={`View ${cert.title} certificate larger`}
          className="relative block aspect-[1.414/1] w-full overflow-hidden bg-zinc-800 p-4 cursor-zoom-in"
        >
          <span className="relative block h-full w-full">
            <Image
              src={pages[0]}
              alt={`${cert.title} certificate`}
              fill
              className="rounded-md object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 384px"
            />
          </span>

          {pages.length > 1 && (
            <span className="absolute right-3 top-3 rounded-full bg-[#0a0a0a]/70 px-2.5 py-1 text-xs text-[#ededed] backdrop-blur">
              {pages.length} pages
            </span>
          )}
        </button>
      ) : (
        <div className="flex aspect-[1.414/1] w-full items-center justify-center bg-zinc-800 text-gray-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12"
            aria-hidden="true"
          >
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-base font-semibold leading-snug text-white">
            {cert.title}
          </h3>
          <p className="mt-1 text-sm text-lime-400">{cert.issuer}</p>
        </div>

        {cert.description && (
          <p className="text-sm leading-relaxed text-gray-400">
            {cert.description}
          </p>
        )}

        {(cert.date || cert.url) && (
          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-gray-500">
            <span>{cert.date}</span>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 border-b border-lime-400 pb-0.5 transition hover:opacity-70"
              >
                View credential
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [page, setPage] = useState(0);

  const selectedPages = selected ? getPages(selected) : [];
  const total = selectedPages.length;

  const openCertificate = useCallback((cert: Certificate) => {
    setSelected(cert);
    setPage(0);
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => setPage((p) => (p + 1) % total), [total]);
  const prev = useCallback(
    () => setPage((p) => (p - 1 + total) % total),
    [total],
  );

  // Saat zoom terbuka: Esc nutup, ← → ganti halaman, scroll halaman dikunci
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (total > 1 && e.key === "ArrowRight") next();
      if (total > 1 && e.key === "ArrowLeft") prev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, total, close, next, prev]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="certificates"
        className="flex items-center px-6 md:px-16 py-20 border-t border-gray-800"
      >
        <div className="w-full max-w-6xl mx-auto">
          <Carousel
            items={certificates}
            getKey={(cert) => `${cert.issuer}-${cert.title}`}
            ariaLabel="Certificates carousel"
            renderItem={(cert) => (
              <CertificateCard cert={cert} onOpen={openCertificate} />
            )}
            header={
              <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="max-w-xl"
              >
                <motion.h2
                  variants={headerItemVariants}
                  className="text-3xl md:text-4xl font-bold uppercase"
                >
                  Certificates
                </motion.h2>

                <motion.p
                  variants={headerItemVariants}
                  className="text-gray-400 text-sm mt-3 leading-relaxed"
                >
                  Certifications and awards that back up the skills I use.
                </motion.p>
              </motion.div>
            }
          />
        </div>
      </section>

      {/* Zoom sertifikat.
          Warna pakai hex langsung (bukan bg-black / text-white) supaya
          overlay tetap gelap di light mode dan nggak ikut ke-remap. */}
      <AnimatePresence>
        {selected && total > 0 && (
          <motion.div
            key="certificate-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} certificate`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0a0a]/90 p-4 md:p-10 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className={`absolute right-4 top-4 md:right-8 md:top-8 ${lightboxButton}`}
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
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous page"
                  className={`absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 ${lightboxButton}`}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next page"
                  className={`absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 ${lightboxButton}`}
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

                <p
                  aria-live="polite"
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#0a0a0a]/70 px-3 py-1 text-xs text-[#ededed]"
                >
                  {page + 1} / {total}
                </p>
              </>
            )}

            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative h-[80vh] w-full max-w-5xl"
            >
              <Image
                key={selectedPages[page]}
                src={selectedPages[page]}
                alt={`${selected.title} certificate, page ${page + 1} of ${total}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
