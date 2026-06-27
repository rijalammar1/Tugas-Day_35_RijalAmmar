import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Basement Memories",
    description:
      "Developed a modern social media photo sharing application that enables users to share posts, upload stories, interact through likes and comments, manage profiles, and discover other users. The frontend was built with Next.js and TypeScript, while the application integrates with a REST API for authentication, post management, story features, user profiles, and social interactions.",
    image: "/images/project5.png",
    tag: "Final Project at DiBimbing Botcamp",
    year: "2026",
    role: "Frontend Developer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Axios",
    ],
    links: [
      {
        label: "Frontend",
        url: "https://github.com/rijalammar1/Basement-Memories",
      },
      {
        label: "Website",
        url: "https://basement-memories.vercel.app/",
      },
    ],
  },
  {
    title: "Blockchain-Based Crowdfunding Management Application",
    description:
      "Developed a blockchain-based crowdfunding management application to enhance transparency, security, and accountability in the fundraising process. The system was built using Express.js for the backend, GETH (Go Ethereum) for blockchain network management, and Laravel for the frontend. Key features include campaign creation, donation management, and immutable transaction recording on the blockchain.",
    image: "/images/project4.png",
    tag: "Final Project",
    year: "2024",
    role: "Full Stack Developer",
    techStack: ["Express.js", "GETH", "Laravel"],
    links: [
      {
        label: "Frontend",
        url: "https://github.com/rijalammar1/FE-Blockchain",
      },
      { label: "Backend", url: "https://github.com/rijalammar1/BE-blockchain" },
      {
        label: "Network",
        url: "https://github.com/rijalammar1/GETH-blockchain",
      },
    ],
  },
  {
    title: "TIBOX",
    description:
      "Developed a mobile application using Flutter (Dart) to support operational needs and data management within a business environment. Focused on building responsive and user-friendly interfaces, improving application performance, and optimizing overall user experience. Collaborated with back-end services for data integration and system functionality.",
    image: "/images/project2.png",
    tag: "Internship Project",
    year: "2023",
    role: "Front End Developer",
    techStack: ["Flutter", "Dart"],
    links: [
      {
        label: "Frontend",
        url: "https://gitlab.com/mohammad.arda/tibox-frontend",
      },
    ],
  },
  {
    title: "Website ShareIn",
    description:
      "Developed a web-based platform for information sharing and digital services using Next.js for front-end development and Laravel for back-end development. Responsible for implementing application features, integrating APIs, and ensuring system performance, responsiveness, and scalability. The platform was designed to provide an optimal user experience while supporting client business needs.",
    image: "/images/project3.png",
    tag: "Internship Project",
    year: "2023",
    role: "Front End Developer",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    links: [
      {
        label: "Frontend",
        url: "https://gitlab.com/christopheradi/sharein/-/tree/new_frontend_v2",
      },
    ],
  },
];
