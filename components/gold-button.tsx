import type React from "react"
import Link from "next/link"
import Image from "next/image"

interface GoldButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
}

export function GoldButton({ href, children, className = "" }: GoldButtonProps) {
  return (
    <Link
      href={href || "#"}
      className={`relative inline-flex items-center justify-center px-16 py-4 text-base font-medium text-purple-primary transition-transform hover:scale-105 ${className}`}
    >
      <div className="absolute inset-0">
        <Image src="/images/button.png" alt="" fill className="object-contain" />
      </div>
      <span className="relative z-10">{children}</span>
    </Link>
  )
}
