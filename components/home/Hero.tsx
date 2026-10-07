"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import Button from "../common/Button";

/* h-20 (80px) + border 1px */
const NAVBAR_HEIGHT = 81;

/* Ganti teks ini, atau hapus blok badge-nya kalau lagi nggak cari kerja */
const STATUS_TEXT = "Open to work";

/* Angka ringkas. Ganti isinya sesuai pilihan di bawah kalau mau */
const stats = [
  { value: "1.5+", label: "Years experience" },
  { value: "56", label: "Projects" },
  { value: "1×", label: "Best Final Project award" },
];

/* Kolom teks: anak-anaknya muncul bergantian */
const textVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* Icon sosmed pop-in satu-satu */
const socialsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

/* Foto: fade-in + zoom-out halus */
const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        style={{ minHeight: `calc(100svh - ${NAVBAR_HEIGHT}px)` }}
        className="flex items-center px-6 md:px-16 py-12"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="show"
            className="max-w-xl space-y-6"
          >
            {/* Badge status */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 rounded-full border border-gray-700 bg-zinc-900/60 px-4 py-1.5 text-xs text-gray-300"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
              </span>
              {STATUS_TEXT}
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold leading-tight uppercase"
            >
              Hi, I am <br /> Rijal Ammar
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm md:text-base"
            >
              A Malang-based front-end developer passionate about creating
              accessible, user-friendly, and high-performance web experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <Button label="Download CV" href="/cv/CV_RijalAmmar.pdf" />

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-lime-400/60 hover:text-lime-400"
              >
                View Projects
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </Link>

              <motion.div variants={socialsVariants} className="flex gap-3">
                <motion.a
                  variants={socialVariants}
                  whileHover={{ y: -3 }}
                  href="https://www.linkedin.com/in/rijal-ammar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <Image
                    src="/images/icons/linkedin.png"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="light:brightness-0"
                  />
                </motion.a>

                <motion.a
                  variants={socialVariants}
                  whileHover={{ y: -3 }}
                  href="https://github.com/rijalammar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <Image
                    src="/images/icons/github.png"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="light:brightness-0"
                  />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Angka ringkas */}
            <motion.dl
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 border-t border-gray-800 pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs text-gray-500">{stat.label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate="show"
            className="relative w-[300px] h-[380px] md:w-[400px] md:h-[480px] bg-gray-300 rounded-2xl overflow-hidden shrink-0"
          >
            <Image
              src="/images/profile.jpeg"
              alt="Rijal Ammar Profile"
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
