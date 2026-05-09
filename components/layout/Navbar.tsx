import Link from "next/link"

const navItems = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Education",
    href: "#education",
  },
  {
    label: "Contact",
    href: "#contact",
  },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-0 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.2em] uppercase transition hover:text-lime-400"
        >
          Rijal Ammar
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="transition hover:text-lime-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
