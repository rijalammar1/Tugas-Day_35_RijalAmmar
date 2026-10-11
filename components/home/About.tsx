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
  /** Opsional: chip tanpa icon tampil sebagai teks aja */
  icon?: React.ComponentType<{ className?: string }>;
};

type SkillSection = {
  /** Opsional: sub-judul kecil di dalam card */
  label?: string;
  items: Skill[];
};

type SkillGroup = {
  title: string;
  className: string;
  /** Card utama (Frontend): border lime dan chip lebih besar */
  emphasis?: boolean;
  sections: SkillSection[];
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
      staggerChildren: 0.05,
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

/* ---------- Chip ---------- */

function Chip({ skill, emphasis }: { skill: Skill; emphasis?: boolean }) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={chipVariants}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`group flex items-center gap-2 border rounded-full transition-colors hover:border-lime-400/60 hover:bg-lime-400/5 ${
        emphasis
          ? "px-4 py-2 text-sm border-gray-700"
          : "px-3 py-1.5 text-xs border-gray-800"
      }`}
    >
      {Icon && (
        <Icon
          className={`transition-colors group-hover:text-lime-400 ${
            emphasis ? "text-gray-400 text-base" : "text-gray-500 text-sm"
          }`}
        />
      )}

      <span
        className={`transition-colors group-hover:text-white ${
          emphasis ? "text-gray-300" : "text-gray-400"
        }`}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ---------- Data ---------- */

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    className: "md:col-span-2 lg:col-span-3",
    emphasis: true,
    sections: [
      {
        label: "Core stack",
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
        label: "Craft",
        items: [
          { name: "Responsive Design" },
          { name: "Accessibility" },
          { name: "Web Performance" },
          { name: "SEO" },
          { name: "UI Implementation" },
        ],
      },
    ],
  },
  {
    title: "Design & Tools",
    className: "md:col-span-2 lg:col-span-1",
    sections: [
      {
        items: [
          { name: "Figma", icon: SiFigma },
          { name: "Git", icon: FaGitAlt },
          { name: "GitHub", icon: FaGithub },
          { name: "GitLab", icon: FaGitlab },
          { name: "ClickUp", icon: SiClickup },
        ],
      },
    ],
  },
  {
    title: "Also Worked With",
    className: "md:col-span-2 lg:col-span-2",
    sections: [
      {
        items: [
          { name: "Node.js", icon: FaNodeJs },
          { name: "Express.js", icon: SiExpress },
          { name: "PHP", icon: SiPhp },
          { name: "Laravel", icon: SiLaravel },
          { name: "REST API", icon: TbApi },
          { name: "WordPress", icon: SiWordpress },
          { name: "TailPress", icon: SiTailwindcss },
          { name: "WooCommerce", icon: SiWoocommerce },
          { name: "Flutter", icon: SiFlutter },
          { name: "Dart", icon: SiDart },
        ],
      },
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
              {skillGroups.map((group, i) => {
                const total = group.sections.reduce(
                  (sum, section) => sum + section.items.length,
                  0,
                );

                return (
                  <motion.div
                    key={group.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className={`flex flex-col rounded-2xl border p-6 md:p-8 transition-colors ${
                      group.emphasis
                        ? "border-lime-400/30 bg-lime-400/5 hover:border-lime-400/50"
                        : "border-gray-800 bg-zinc-900/30 hover:border-gray-700"
                    } ${group.className}`}
                  >
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h4
                          className={`font-semibold ${
                            group.emphasis
                              ? "text-lg text-lime-400"
                              : "text-base text-gray-300"
                          }`}
                        >
                          {group.title}
                        </h4>

                        {group.emphasis && (
                          <span className="rounded-full border border-lime-400/40 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-lime-400">
                            Main focus
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-gray-500 tabular-nums">
                        {String(total).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className={`grid gap-8 ${
                        group.sections.length > 1
                          ? "md:grid-cols-[1.4fr_1fr]"
                          : ""
                      }`}
                    >
                      {group.sections.map((section, s) => (
                        <div key={s}>
                          {section.label && (
                            <p className="mb-4 text-xs uppercase tracking-wider text-gray-500">
                              {section.label}
                            </p>
                          )}

                          <div
                            className={`flex flex-wrap content-start ${
                              group.emphasis ? "gap-3" : "gap-2"
                            }`}
                          >
                            {section.items.map((skill) => (
                              <Chip
                                key={skill.name}
                                skill={skill}
                                emphasis={group.emphasis}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
