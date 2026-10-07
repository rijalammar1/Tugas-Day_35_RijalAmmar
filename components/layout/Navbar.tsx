"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/common/ThemeToggle";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll spy: section yang lewat di pita tengah layar jadi aktif
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            setActive(id);
          } else {
            // Section keluar pita dan belum ada pengganti (misal balik ke Hero)
            setActive((prev) => (prev === id ? "" : prev));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Tutup menu mobile pakai tombol Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Tutup otomatis kalau layar membesar ke ukuran desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-0 h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-bold tracking-[0.2em] uppercase transition hover:text-lime-400"
        >
          Rijal Ammar
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-1 transition hover:text-lime-400 ${
                    isActive ? "text-lime-400" : ""
                  }`}
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-lime-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          {/* Tombol hamburger, cuma muncul di mobile */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-lime-400 hover:border-lime-400/60 transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Panel menu mobile: tinggi dianimasikan lewat grid-rows */}
      <div
        id="mobile-menu"
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          aria-label="Mobile"
          aria-hidden={!open}
          className="overflow-hidden"
        >
          <ul className="px-6 py-2 border-t border-gray-800 flex flex-col">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive ? "location" : undefined}
                    className={`block py-3 text-sm transition hover:text-lime-400 ${
                      isActive ? "text-lime-400" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
