import type React from "react"
import type { Metadata } from "next"
import { Josefin_Sans } from "next/font/google"
import "./globals.css"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-josefin-sans",
})

export const metadata: Metadata = {
  title: "A Life Worth Remembering",
  description: "Create your online legacy and memoirs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
