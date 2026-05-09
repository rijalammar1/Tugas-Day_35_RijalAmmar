import SectionWrapper from "@/components/common/SectionWrapper"
import InfoCard from "@/components/common/InfoCard"

import { education } from "@/app/data/education"

export default function EducationSection() {
  return (
    <SectionWrapper id="education" title="Education">
      {education.map((edu) => (
        <InfoCard
          key={edu.title}
          title={edu.title}
          subtitle={edu.school}
          period={edu.period}
          description={edu.description}
        />
      ))}
    </SectionWrapper>
  )
}
