import { Project } from "@/types"

export const projects: Project[] = [
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
]
