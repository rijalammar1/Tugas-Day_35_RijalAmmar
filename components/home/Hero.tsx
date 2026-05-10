import Image from "next/image"
import Button from "../common/Button"

export default function Hero() {
  return (
    <section className="px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight uppercase">
            Hi, I am <br /> Rijal Ammar
          </h2>

          <p className="text-gray-400 text-sm md:text-base">
            An Malang-based front-end developer passionate about creating
            accessible, user-friendly, and high-performance web experiences.
          </p>

          <div className="flex items-center gap-4">
            <Button label="Download CV" href="/cv/resume.pdf" />

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/rijal-ammar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Image
                  src="/images/icons/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </a>

              <a
                href="https://github.com/rijalammar1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Image
                  src="/images/icons/github.png"
                  alt="GitHub"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-[300px] h-[380px] md:w-[400px] md:h-[480px] bg-gray-300 rounded-2xl overflow-hidden shrink-0">
          <Image
            src="/images/profile.jpeg"
            alt="Rijal Ammar Profile"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="(max-width: 768px) 300px, 400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
