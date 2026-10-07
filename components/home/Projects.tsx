"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/app/data/projects";

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

export default function Projects() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projects"
        className="px-6 md:px-16 py-20 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto">
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
              Featured Projects
            </motion.h2>

            <motion.p
              variants={headerItemVariants}
              className="text-gray-400 text-sm mt-3 leading-relaxed"
            >
              Here are some of the selected projects that showcase my passion
              for front-end development.
            </motion.p>
          </motion.div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
