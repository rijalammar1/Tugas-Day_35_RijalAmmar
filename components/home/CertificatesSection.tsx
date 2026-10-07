"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

import { certificates } from "@/app/data/certificates";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

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

/* Grid: card muncul bergantian */
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CertificatesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="certificates"
        className="flex items-center px-6 md:px-16 py-20 border-t border-gray-800"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="max-w-xl mb-12"
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

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert) => (
              <motion.article
                key={`${cert.issuer}-${cert.title}`}
                variants={cardVariants}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-zinc-900/40 transition-colors hover:border-lime-400/40"
              >
                {/* Gambar sertifikat */}
                <div className="relative aspect-[4/3] w-full bg-zinc-800">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
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
                </div>

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
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
