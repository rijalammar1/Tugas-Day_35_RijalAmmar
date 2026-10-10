export type Certificate = {
  title: string;
  issuer: string;
  /** Opsional, misal "Jul 2026" */
  date?: string;
  /** Opsional, satu kalimat tentang sertifikatnya */
  description?: string;
  /** Opsional, path di folder public, misal "/images/certificates/dibimbing-best-final-project.jpg" */
  image?: string;
  /** Opsional, buat sertifikat lebih dari satu halaman. Kalau diisi, menggantikan `image` */
  pages?: string[];
  /** Opsional, link verifikasi atau kredensial */
  url?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Frontend Developer Internship",
    issuer: "ADS Digital Partner (PT. Adma Digital Solusi)",
    date: "Aug 2023 – Dec 2023",
    description:
      "Implemented UI designs using Laravel, Flutter, Next.js, and Tailwind CSS, and integrated REST APIs in collaboration with backend engineers.",
    pages: [
      "/images/certificates/ads-digital-partner-1.jpg",
      "/images/certificates/ads-digital-partner-2.jpg",
    ],
  },
  {
    title: "Web Developer Internship",
    issuer: "PT. Universal Big Data",
    date: "Dec 2018 – Nov 2019",
    description:
      "Designed and implemented the Enotaris website using PHP, CodeIgniter, AJAX, and SQL, and supported clients with installation and follow-up.",
    image: "/images/certificates/universal-big-data-internship.jpg",
  },
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
