"use client";

import { motion, MotionConfig } from "motion/react";

import SectionWrapper from "@/components/common/SectionWrapper";
import InfoCard from "@/components/common/InfoCard";

import { experiences } from "@/app/data/experience";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

export default function ExperienceSection() {
  return (
    <MotionConfig reducedMotion="user">
      <SectionWrapper id="experience" title="My Experience">
        {experiences.map((exp) => (
          <motion.div
            key={`${exp.title}-${exp.company}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <InfoCard
              title={exp.title}
              subtitle={exp.company}
              period={exp.period}
              description={exp.description}
            />
          </motion.div>
        ))}
      </SectionWrapper>
    </MotionConfig>
  );
}
