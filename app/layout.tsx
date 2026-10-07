import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rijalammar.vercel.app";

const DESCRIPTION =
  "Front-end developer based in Malang, building fast, accessible, and user-friendly web experiences with Next.js, React, and Tailwind CSS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rijal Ammar | Front-End Developer",
    template: "%s | Rijal Ammar",
  },
  description: DESCRIPTION,
  keywords: [
    "Rijal Ammar",
    "Front-End Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Malang",
    "Portfolio",
  ],
  authors: [{ name: "Rijal Ammar", url: SITE_URL }],
  creator: "Rijal Ammar",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rijal Ammar",
    title: "Rijal Ammar | Front-End Developer",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rijal Ammar | Front-End Developer",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

/* Jalan sebelum halaman dirender, biar nggak kedip gelap dulu pas refresh di light mode */
const themeScript = `
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.dataset.theme = t === "light" ? "light" : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
