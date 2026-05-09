import Image from "next/image"

export default function SocialIcon({
  url,
  icon,
  name,
}: {
  url: string
  icon: string
  name: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 hover:scale-110 transition"
    >
      <Image src={icon} alt={name} width={18} height={18} />
    </a>
  )
}
