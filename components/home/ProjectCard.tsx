"use client"

import Image from "next/image"
import { Project } from "@/types"

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="grid md:grid-cols-[480px_1fr] gap-10 items-start">
      <div className="bg-zinc-900 border border-gray-800 p-6 rounded-2xl w-full max-w-[480px] shadow-sm hover:shadow-lg transition">
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
      </div>

      <div className="space-y-5 mt-1">
        <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="border-t border-gray-700 pt-4 text-sm space-y-3">
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
        </div>

        {project.techStack && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Technologies</p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-zinc-800 border border-gray-700 rounded-full text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-lime-400 text-sm pt-2">
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
        </div>
      </div>
    </div>
  )
}
