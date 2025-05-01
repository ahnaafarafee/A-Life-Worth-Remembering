import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SectionHeader from "@/components/section-header"
import { GoldButton } from "@/components/gold-button"
import { Clock, Mail } from "lucide-react"

export default function LoginPage() {
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
          <div className="container mx-auto px-4 max-w-3xl">
            <SectionHeader
              title="LOGIN COMING SOON"
              subtitle="We're working diligently to bring you secure account access"
            />

            <div className="bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-8 md:p-12 shadow-gold text-center mb-12">
              <div className="flex justify-center mb-8">
                <div className="bg-gold-primary/20 p-4 rounded-full">
                  <Clock className="h-12 w-12 text-gold-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-purple-primary mb-6">Our Login System Is Being Perfected</h3>

              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                We're currently finalizing our secure login system to ensure your memorial pages and personal
                information are protected with the highest standards of security and privacy. This feature will be
                available very soon.
              </p>

              <div className="bg-purple-primary/5 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-purple-primary mb-3">In the meantime, you can:</h4>
                <ul className="text-gray-700 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-gold-primary mr-2">•</span>
                    <span>Explore our featured memorial pages for inspiration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-primary mr-2">•</span>
                    <span>Learn about our pricing plans and features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-primary mr-2">•</span>
                    <span>Contact our support team with any questions</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <GoldButton href="/pricing">View Pricing Plans</GoldButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gold-primary text-gold-primary rounded-full transition-all hover:bg-gold-primary/5"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="text-center text-gray-600">
              <p>
                Would you like to be notified when our login system is ready?{" "}
                <Link href="/contact" className="text-gold-primary hover:underline">
                  Let us know
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
