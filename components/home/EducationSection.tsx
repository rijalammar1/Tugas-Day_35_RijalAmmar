"use client";

import { motion, MotionConfig } from "motion/react";

import SectionWrapper from "@/components/common/SectionWrapper";
import InfoCard from "@/components/common/InfoCard";

import { education } from "@/app/data/education";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

export default function EducationSection() {
  return (
    <MotionConfig reducedMotion="user">
      <SectionWrapper id="education" title="Education">
        {education.map((edu) => (
          <motion.div
            key={edu.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <InfoCard
              title={edu.title}
              subtitle={edu.school}
              period={edu.period}
              description={edu.description}
            />
          </motion.div>
        ))}
      </SectionWrapper>
    </MotionConfig>
  );
}
