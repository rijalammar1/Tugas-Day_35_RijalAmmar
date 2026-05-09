export interface ButtonProps {
  label: string
  href?: string
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  title: string
  description: string
  image: string
  tag: string
  year: string
  role: string
  client?: string
  techStack?: string[]
  links: {
    label: string
    url: string
  }[]
}

export interface Experience {
  title: string
  company?: string
  period: string
  description: string[]
}
