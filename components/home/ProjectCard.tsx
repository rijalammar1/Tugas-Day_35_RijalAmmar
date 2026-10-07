"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
}

const viewport = { once: true, margin: "0px 0px -80px 0px" };

/* Root: cuma jadi trigger, anak-anaknya yang animasi */
const rootVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

/* Card gambar masuk dari kiri */
const imageVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* Kolom info masuk dari kanan, lalu isinya muncul bergantian */
const infoVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function ProjectCard({ project }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={rootVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid md:grid-cols-[480px_1fr] gap-10 items-start"
      >
        <motion.div
          variants={imageVariants}
          className="bg-zinc-900 border border-gray-800 p-6 rounded-2xl w-full max-w-[480px] shadow-sm hover:shadow-lg transition"
        >
          <span className="text-xs bg-zinc-800 text-gray-300 px-3 py-1 rounded-full inline-block mb-4">
            {project.tag}
          </span>

          <div className="bg-zinc-800 rounded-xl p-4 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={infoVariants} className="space-y-5 mt-1">
          <motion.h3
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold text-white leading-snug"
          >
            {project.title}
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm leading-relaxed"
          >
            {project.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="border-t border-gray-700 pt-4 text-sm space-y-3"
          >
            {project.client && (
              <div className="flex justify-between">
                <span className="text-gray-500">Client</span>
                <span className="text-white">{project.client}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500">Year</span>
              <span className="text-white">{project.year}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Role</span>
              <span className="text-white">{project.role}</span>
            </div>
          </motion.div>

          {project.techStack && (
            <motion.div variants={itemVariants}>
              <p className="text-xs text-gray-500 mb-2">Technologies</p>

              <motion.div
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-wrap gap-2"
              >
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={i}
                    variants={chipVariants}
                    className="text-xs px-3 py-1 bg-zinc-800 border border-gray-700 rounded-full text-gray-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 text-lime-400 text-sm pt-2"
          >
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-lime-400 pb-1 hover:opacity-70 transition"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
