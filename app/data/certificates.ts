export type Certificate = {
  title: string;
  issuer: string;
  /** Opsional, misal "Jul 2026" */
  date?: string;
  /** Opsional, satu kalimat tentang sertifikatnya */
  description?: string;
  /** Opsional, path di folder public, misal "/images/certificates/dibimbing-best-final-project.jpg" */
  image?: string;
  /** Opsional, link verifikasi atau kredensial */
  url?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Best Final Project Award",
    issuer: "DiBimbing",
    description:
      "Awarded for developing a high-quality capstone project in the Front End Web Development Bootcamp.",
    date: "Jul 2026",
    image: "/images/certificates/Certificate Best Finpro.png",
    // url: "https://...",
  },
  {
    title: "Most Active Student",
    issuer: "DiBimbing",
    description:
      "Recognized for consistently contributing to discussions and completing assignments throughout the program.",
    date: "Jul 2026",
    image: "/images/certificates/Certificate Most Active Student.png",
  },
  {
    title: "Front-End Web Development Bootcamp",
    issuer: "DiBimbing",
    description:
      "Successfully completed the Front-End Web Development Bootcamp and passed the final exam with a score of 94.60 (A+).",
    date: "Jul 2026",
    image:
      "/images/certificates/Certificate of Completion and pass the exam.png",
  },
];
