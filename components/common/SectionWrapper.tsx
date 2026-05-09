export default function SectionWrapper({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t border-gray-800 py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0 grid md:grid-cols-[300px_1fr] gap-16">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase">{title}</h2>
        </div>

        <div className="space-y-10">{children}</div>
      </div>
    </section>
  )
}
