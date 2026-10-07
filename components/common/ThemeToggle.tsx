"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Baca tema yang udah diset script anti-flash di <head>
  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      // abaikan kalau storage diblok
    }
  }

  // Placeholder dengan ukuran sama, biar nggak ada layout shift sebelum mount
  if (!theme) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
      className="relative w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-lime-400 hover:border-lime-400/60 transition-colors cursor-pointer"
    >
      {/* Matahari (tampil di dark mode, klik buat ke light) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isLight
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Bulan (tampil di light mode, klik buat ke dark) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isLight
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
