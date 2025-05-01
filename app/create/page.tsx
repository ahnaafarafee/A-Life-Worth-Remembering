import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SectionHeader from "@/components/section-header"
import { GoldButton } from "@/components/gold-button"
import { ArrowRight, Check } from "lucide-react"

export default function CreatePage() {
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader
              title="CREATE YOUR MEMORIAL PAGE"
              subtitle="Honor your loved ones with a beautiful and lasting digital tribute"
            />

            <div className="bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-8 md:p-12 shadow-gold mb-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold text-purple-primary mb-6">
                  Select a Plan to Begin Your Memorial Journey
                </h3>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                  To create your personalized memorial page, you'll need to select one of our thoughtfully designed
                  packages. Each plan offers unique features to help you honor and celebrate a life worth remembering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gold-primary/30 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gold-primary">Classic Package</h4>
                    <p className="text-gray-600 text-sm">The ideal tribute for honoring loved ones who have passed</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>Personalized memorial page</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>Up to 30 photos in gallery</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>Guest book for visitors</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center px-6 py-2 bg-gold-primary/10 text-gold-primary font-medium rounded-full transition-colors hover:bg-gold-primary/20"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gold-primary relative transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="absolute top-0 right-0 bg-gold-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    RECOMMENDED
                  </div>
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gold-primary">Premium Package</h4>
                    <p className="text-gray-600 text-sm">Enhanced content capacity with more enriching features</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>Everything in Classic, plus:</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>1000+ photos in gallery</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                      <span>Stories, sound clips & videos</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center px-6 py-2 bg-gold-primary/10 text-gold-primary font-medium rounded-full transition-colors hover:bg-gold-primary/20"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <GoldButton href="/pricing">View Full Pricing Details</GoldButton>
              </div>
            </div>

            <div className="bg-purple-primary/5 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-purple-primary mb-4">Need Help Getting Started?</h3>
              <p className="text-gray-700 mb-6">
                Our team is here to assist you in creating a beautiful memorial page. If you have any questions about
                our plans or need guidance, please don't hesitate to reach out.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-purple-primary text-purple-primary rounded-full transition-all hover:bg-purple-primary/5"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
