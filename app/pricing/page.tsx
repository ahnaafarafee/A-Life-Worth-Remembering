import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingSection from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div
      className="min-h-screen w-full py-8 px-4 md:px-8 lg:px-12"
      style={{
        backgroundImage: "url('/images/background-new.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        maxWidth: "100%",
      }}
    >
      <div className="container mx-auto max-w-7xl bg-white rounded-lg border-4 border-gold-primary shadow-2xl overflow-hidden">
        <Navbar />

        <div className="py-8">
          <h1 className="text-4xl md:text-5xl font-light text-gold-primary text-center mb-8">Pricing Plans</h1>
          <p className="text-center text-gray-700 max-w-3xl mx-auto px-4 mb-12">
            Choose the perfect memorial package to honor your loved ones and preserve precious memories for generations
            to come.
          </p>
        </div>

        <PricingSection />

        <Footer />
      </div>
    </div>
  )
}
