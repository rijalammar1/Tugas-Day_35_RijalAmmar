import { contact } from "@/app/data/contact"

import SocialIcon from "@/components/common/SocialIcon"

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-16 py-20 border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold uppercase">
            Let’s Connect
          </h2>

          <div className="text-gray-400 text-sm space-y-2">
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
                href="/cv/resume.pdf"
                download
                className="text-white underline decoration-lime-400"
              >
                resume
              </a>
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            {contact.socials.map((item) => (
              <SocialIcon
                key={item.name}
                url={item.url}
                icon={item.icon}
                name={item.name}
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 pt-10">© 2026 Rijal Ammar</p>
        </div>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-zinc-900 border border-gray-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-900 border border-gray-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime-400"
          />

          <textarea
            rows={5}
            placeholder="Message"
            className="w-full bg-zinc-900 border border-gray-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime-400"
          />

          <button
            type="submit"
            className="bg-lime-400 text-black px-6 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
