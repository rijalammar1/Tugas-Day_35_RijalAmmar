"use client"

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaGitlab,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa"

import {
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiExpress,
  SiFlutter,
  SiDart,
  SiClickup,
  SiTypescript,
} from "react-icons/si"

export default function About() {
  const skillGroups = [
    {
      title: "Frontend",
      items: [
        { name: "HTML", icon: FaHtml5 },
        { name: "CSS", icon: FaCss3Alt },
        { name: "JavaScript", icon: FaJs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "React", icon: FaReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind", icon: SiTailwindcss },
        { name: "Flutter", icon: SiFlutter },
        { name: "Dart", icon: SiDart },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express", icon: SiExpress },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "GitHub", icon: FaGithub },
        { name: "GitLab", icon: FaGitlab },
        { name: "Git", icon: FaGitAlt },
        { name: "ClickUp", icon: SiClickup },
      ],
    },
  ]

  return (
    <section id="about" className="border-t border-gray-800 py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0 space-y-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
              About Me
            </h2>
          </div>

          <div className="max-w-xl space-y-6">
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed text-white">
              I am a front-end developer based in Indonesia with a strong
              passion for building modern and user-friendly web experiences.
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Computer Science graduate with 1.5 years of experience as a
              Website and Front-End Developer. Skilled in building web and
              mobile applications, crafting responsive interfaces, and
              collaborating within development teams using modern software
              development workflows. Currently open to work as a Front-End
              Developer.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold uppercase">
              My Capabilities
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <div
                key={i}
                className="border border-gray-800 rounded-2xl p-6 bg-zinc-900/40"
              >
                <h4 className="text-lg font-semibold text-lime-400 mb-6">
                  {group.title}
                </h4>

                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, idx) => {
                    const Icon = skill.icon

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm"
                      >
                        <Icon className="text-gray-400 text-base" />

                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
