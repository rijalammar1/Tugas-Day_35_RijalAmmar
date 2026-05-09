import ProjectCard from "./ProjectCard"
import { projects } from "@/app/data/projects"

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 md:px-16 py-20 border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Here are some of the selected projects that showcase my passion for
            front-end development.
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
