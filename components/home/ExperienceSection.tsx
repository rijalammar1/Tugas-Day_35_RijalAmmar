import SectionWrapper from "@/components/common/SectionWrapper"
import InfoCard from "@/components/common/InfoCard"

import { experiences } from "@/app/data/experience"

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="My Experience">
      {experiences.map((exp) => (
        <InfoCard
          key={`${exp.title}-${exp.company}`}
          title={exp.title}
          subtitle={exp.company}
          period={exp.period}
          description={exp.description}
        />
      ))}
    </SectionWrapper>
  )
}
