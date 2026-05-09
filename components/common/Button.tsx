import Link from "next/link"
import { ButtonProps } from "@/types"

export default function Button({ label, href }: ButtonProps) {
  return (
    <Link
      href={href || "#"}
      className="bg-lime-400 text-black px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-lime-300 transition"
    >
      {label}
    </Link>
  )
}
