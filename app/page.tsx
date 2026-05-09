import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Projects from "@/components/home/Projects"
import ExperienceSection from "@/components/home/ExperienceSection"
import EducationSection from "@/components/home/EducationSection"
import Contact from "@/components/home/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <Hero />
        <About />
        <Projects />
        <EducationSection />
        <ExperienceSection />
        <Contact />
      </main>
    </>
  )
}
