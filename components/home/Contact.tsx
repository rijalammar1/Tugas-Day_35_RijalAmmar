"use client";

import { useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

import { contact } from "@/app/data/contact";

import SocialIcon from "@/components/common/SocialIcon";

/* h-20 (80px) + border 1px, sama kayak di Hero */
const NAVBAR_HEIGHT = 81;

const FORM_ENDPOINT = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;

type Status = "idle" | "sending" | "success" | "error";

const viewport = { once: true, margin: "0px 0px -80px 0px" };

/* Kolom kiri: isinya muncul bergantian */
const leftVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

/* Form: field muncul bergantian, telat dikit dari kolom kiri */
const formVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* Icon sosmed pop-in satu-satu */
const socialsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const fieldClass =
  "w-full bg-zinc-900 border border-gray-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime-400 disabled:opacity-60";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: field tersembunyi, manusia nggak bakal ngisi.
    // Kalau terisi berarti bot, pura-pura sukses aja.
    if (data.get("_gotcha")) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        style={{
          minHeight: `calc(100svh - ${NAVBAR_HEIGHT}px)`,
          scrollMarginTop: NAVBAR_HEIGHT,
        }}
        className="flex items-center px-6 md:px-16 py-20 border-t border-gray-800"
      >
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold uppercase"
            >
              Let’s Connect
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="text-gray-400 text-sm space-y-2"
            >
              <p>
                Say hello at{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white underline decoration-lime-400"
                >
                  {contact.email}
                </a>
              </p>

              <p>
                Download my{" "}
                <a
                  href="/cv/CV_RijalAmmar.pdf"
                  download
                  className="text-white underline decoration-lime-400"
                >
                  resume
                </a>
              </p>
            </motion.div>

            <motion.div variants={socialsVariants} className="flex gap-4 mt-4">
              {contact.socials.map((item) => (
                <motion.div key={item.name} variants={socialVariants}>
                  <SocialIcon
                    url={item.url}
                    icon={item.icon}
                    name={item.name}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-500 pt-10"
            >
              © 2026 Rijal Ammar
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-6"
          >
            {/* Honeypot anti-spam, disembunyiin dari user dan screen reader */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <motion.input
              variants={itemVariants}
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              required
              disabled={isSending}
              autoComplete="name"
              className={fieldClass}
            />

            <motion.input
              variants={itemVariants}
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              required
              disabled={isSending}
              autoComplete="email"
              className={fieldClass}
            />

            <motion.textarea
              variants={itemVariants}
              name="message"
              rows={5}
              placeholder="Message"
              aria-label="Message"
              required
              minLength={10}
              disabled={isSending}
              className={fieldClass}
            />

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={isSending ? undefined : { scale: 1.04 }}
                whileTap={isSending ? undefined : { scale: 0.97 }}
                type="submit"
                disabled={isSending}
                className="bg-lime-400 text-black px-6 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Submit"}
              </motion.button>

              {/* Pesan status, dibacain screen reader otomatis */}
              <p role="status" aria-live="polite" className="text-sm">
                {status === "success" && (
                  <span className="text-lime-400">
                    Thanks! Your message has been sent.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-500">
                    Something went wrong. Please try again or email me directly.
                  </span>
                )}
              </p>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </MotionConfig>
  );
}
