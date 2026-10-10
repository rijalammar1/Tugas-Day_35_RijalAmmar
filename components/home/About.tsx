"use client";

import { motion, MotionConfig, type Variants } from "motion/react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaGitlab,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFlutter,
  SiDart,
  SiClickup,
  SiTypescript,
  SiWordpress,
  SiPhp,
  SiLaravel,
  SiRedux,
  SiWoocommerce,
  SiFigma,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";

type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SkillGroup = {
  title: string;
  className: string;
  items: Skill[];
};

const viewport = { once: true, margin: "0px 0px -60px 0px" };

/* ---------- Variants ---------- */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.1,
      // chip di dalam card nyusul satu-satu setelah card muncul
      delayChildren: index * 0.1 + 0.25,
      staggerChildren: 0.07,
    },
  }),
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

/* ---------- Reusable reveal ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Data ---------- */

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    className: "md:col-span-2 lg:row-span-2",
    items: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "WordPress",
    className: "",
    items: [
      { name: "WordPress", icon: SiWordpress },
      { name: "TailPress", icon: SiTailwindcss },
      { name: "WooCommerce", icon: SiWoocommerce },
    ],
  },
  {
    title: "Backend",
    className: "",
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "PHP", icon: SiPhp },
      { name: "Laravel", icon: SiLaravel },
      { name: "REST API", icon: TbApi },
    ],
  },
  {
    title: "Mobile",
    className: "",
    items: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
    ],
  },
  {
    title: "Tools",
    className: "lg:col-span-2",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "GitLab", icon: FaGitlab },
      { name: "Figma", icon: SiFigma },
      { name: "ClickUp", icon: SiClickup },
    ],
  },
];

/* ---------- Section ---------- */

export default function About() {
  return (
    // reducedMotion="user": animasi otomatis dimatiin kalau OS user set "reduce motion"
    <MotionConfig reducedMotion="user">
      <section id="about" className="border-t border-gray-800 py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-0 space-y-20">
          {/* About */}
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
                About Me
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="max-w-xl space-y-6">
              <h3 className="text-xl md:text-2xl font-medium leading-relaxed text-white">
                I am a front-end developer based in Malang with a strong passion
                for building modern and user-friendly web experiences.
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Informatics Engineering graduate with 1.5 years of experience as
                a Website and Front-End Developer. Skilled in building web and
                mobile applications, crafting responsive interfaces, and
                collaborating within development teams using modern software
                development workflows.
              </p>
            </Reveal>
          </div>

          {/* Capabilities */}
          <div className="space-y-12">
            <Reveal>
              <h3 className="text-2xl md:text-3xl font-semibold uppercase">
                My Capabilities
              </h3>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className={`flex flex-col border border-gray-800 rounded-2xl p-6 md:p-8 bg-zinc-900/40 transition-colors hover:border-gray-700 ${group.className}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-lime-400">
                      {group.title}
                    </h4>

                    <span className="text-xs text-gray-500 tabular-nums">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-wrap content-start gap-3">
                    {group.items.map((skill) => {
                      const Icon = skill.icon;

                      return (
                        <motion.div
                          key={skill.name}
                          variants={chipVariants}
                          whileHover={{ y: -3 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 18,
                          }}
                          className="group flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm transition-colors hover:border-lime-400/60 hover:bg-lime-400/5"
                        >
                          <Icon className="text-gray-400 text-base transition-colors group-hover:text-lime-400" />

                          <span className="text-gray-300 transition-colors group-hover:text-white">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
