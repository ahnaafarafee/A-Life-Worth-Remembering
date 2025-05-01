import type React from "react"

interface FeatureItemProps {
  children: React.ReactNode
}

export function FeatureItem({ children }: FeatureItemProps) {
  return (
    <div className="flex items-start text-left">
      <div className="mr-3 mt-1">
        <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
      </div>
      <p className="text-gray-700">{children}</p>
    </div>
  )
}
