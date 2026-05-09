export default function InfoCard({
  title,
  subtitle,
  period,
  description,
}: {
  title: string
  subtitle?: string
  period: string
  description: string[]
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-lime-400 text-sm">{subtitle}</p>}
        </div>
        <span className="text-xs text-gray-400">{period}</span>
      </div>

      <ul className="space-y-2">
        {description.map((item, i) => (
          <li key={i} className="flex gap-2 text-gray-400 text-sm">
            <span className="text-lime-400">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
