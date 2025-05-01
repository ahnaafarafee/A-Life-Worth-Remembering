import Image from "next/image"

interface SectionHeaderProps {
  title: string
  subtitle: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <header className={`text-center mb-16 ${className}`}>
      <div className="flex justify-center mb-6">
        <Image src="/images/heart.png" alt="Golden Heart" width={60} height={60} className="object-contain" />
      </div>
      <h2 className="text-4xl font-bold text-gold-primary mb-8 tracking-wide uppercase">{title}</h2>
      <p className="text-xl max-w-[800px] mx-auto leading-relaxed text-gray-800">{subtitle}</p>
      <div className="mt-8 flex justify-center">
        <div className="w-24 h-[2px] bg-gold-primary"></div>
      </div>
    </header>
  )
}
