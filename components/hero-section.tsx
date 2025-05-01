import Image from "next/image"
import Link from "next/link"
import { GoldButton } from "@/components/gold-button"

export default function HeroSection() {
  return (
    <section className="lwm-hero-section relative w-full h-[500px] overflow-hidden text-white">
      <div className="lwm-hero-background absolute top-0 left-0 w-full h-full z-1">
        <Image src="/images/hero-background.png" alt="Memorial background" fill className="object-cover" priority />
      </div>
      <div className="lwm-hero-overlay absolute top-0 left-0 w-full h-full bg-purple-primary/80 z-2"></div>

      {/* Floating hearts */}
      <div className="lwm-floating-heart absolute w-[30px] h-[30px] top-[20%] left-[10%] opacity-60 z-2 animate-float-rotate-1">
        <Image src="/images/heart.png" alt="" fill className="drop-shadow-glow" />
      </div>
      <div className="lwm-floating-heart absolute w-[25px] h-[25px] top-[30%] right-[15%] opacity-60 z-2 animate-float-rotate-2">
        <Image src="/images/heart.png" alt="" fill className="drop-shadow-glow" />
      </div>
      <div className="lwm-floating-heart absolute w-[20px] h-[20px] bottom-[25%] left-[20%] opacity-60 z-2 animate-float-rotate-3">
        <Image src="/images/heart.png" alt="" fill className="drop-shadow-glow" />
      </div>

      <div className="lwm-hero-content relative z-3 max-w-[800px] mx-auto text-center flex flex-col items-center justify-center h-full">
        <div className="relative w-[50px] h-[50px] mb-5">
          <Image src="/images/heart.png" alt="Golden Heart" fill className="object-contain drop-shadow-glow" />
        </div>
        <h1 className="text-5xl font-semibold mb-5 text-shadow text-white">Create Your Legacy Today</h1>
        <p className="text-xl leading-relaxed mb-10 max-w-[600px] text-shadow">
          Honor your loved ones with a beautiful memorial page that preserves their memory for generations to come.
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          <GoldButton href="/create">CREATE A PAGE</GoldButton>
          <Link
            href="/contact"
            className="lwm-hero-button-secondary bg-transparent text-white font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10 hover:translate-y-[-3px] border-2 border-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
