import { Check } from "lucide-react"
import { GoldButton } from "@/components/gold-button"
import SectionHeader from "@/components/section-header"

export default function PricingSection() {
  const features = [
    { name: "Personalised URL", classic: true, premium: true },
    { name: "Privacy Options", classic: true, premium: true },
    { name: "Personalised background image", classic: true, premium: true },
    { name: "Personalised font colour", classic: true, premium: true },
    { name: "A life in pictures video", classic: true, premium: true },
    { name: "Profile image", classic: true, premium: true },
    { name: "Sliding banner", classic: true, premium: true },
    { name: "Introduction", classic: true, premium: true },
    { name: "Relationships", classic: true, premium: true },
    { name: "General knowledge", classic: true, premium: true },
    { name: "Insights", classic: true, premium: true },
    { name: "Gallery", classic: "30", premium: "1000+" },
    { name: "Guest book", classic: true, premium: true },
    { name: "Stories", classic: false, premium: true },
    { name: "Sound clips", classic: false, premium: true },
    { name: "Events", classic: false, premium: true },
    { name: "RSVPs", classic: false, premium: true },
    { name: "Funeral wishes", classic: true, premium: true },
    { name: "3 images", classic: true, premium: true },
    { name: "Obituary", classic: true, premium: true },
    { name: "Eulogy", classic: true, premium: true },
    { name: "Order of Service", classic: true, premium: true },
    { name: "Message from the family", classic: true, premium: true },
    { name: "Video", classic: false, premium: true },
    { name: "Tributes", classic: true, premium: true },
    { name: "Written message from the honouree", classic: true, premium: true },
    { name: "Video message from the honouree", classic: true, premium: true },
    { name: "Make a donation", classic: true, premium: true },
    { name: "Relatives & Friends", classic: true, premium: true },
    { name: "Share your page", classic: true, premium: true },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="PRICING PACKAGES"
          subtitle="Choose the perfect package to honor your loved ones and preserve precious memories for generations to come."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {/* Classic Package */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gold-primary/30 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="bg-gold-primary/10 p-6 text-center border-b border-gold-primary/20">
              <h3 className="text-2xl font-bold text-gold-primary mb-3">CLASSIC PACKAGE</h3>
              <p className="text-gray-600">The ideal tribute for honouring loved ones who have passed.</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-purple-primary">£99</span>
                <span className="text-gray-500 ml-2">/ year</span>
              </div>
              <GoldButton href="/create?package=classic" className="mb-6">
                Select Classic
              </GoldButton>
              <div className="w-full">
                <h4 className="font-semibold text-purple-primary mb-3 text-center">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Personalized memorial page</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Up to 30 photos in gallery</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Guest book for visitors</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Tributes and messages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Package */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gold-primary relative transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute top-0 right-0 bg-gold-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="bg-gold-primary/20 p-6 text-center border-b border-gold-primary/30">
              <h3 className="text-2xl font-bold text-gold-primary mb-3">PREMIUM PACKAGE</h3>
              <p className="text-gray-600">
                Enhanced content capacity with more enriching features, ideal for journalling your life story.
              </p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-purple-primary">£149</span>
                <span className="text-gray-500 ml-2">/ year</span>
              </div>
              <GoldButton href="/create?package=premium" className="mb-6">
                Select Premium
              </GoldButton>
              <div className="w-full">
                <h4 className="font-semibold text-purple-primary mb-3 text-center">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Everything in Classic, plus:</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>1000+ photos in gallery</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Stories, sound clips & videos</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0" />
                    <span>Events management with RSVPs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gold-primary/30">
          <div className="bg-gold-primary/10 p-4 border-b border-gold-primary/20">
            <h3 className="text-xl font-bold text-gold-primary text-center">Full Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2">Features</th>
                  <th className="py-3 px-4 text-center font-semibold text-purple-primary w-1/4">Classic</th>
                  <th className="py-3 px-4 text-center font-semibold text-purple-primary w-1/4">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-4 border-t border-gray-200">{feature.name}</td>
                    <td className="py-2 px-4 text-center border-t border-gray-200">
                      {typeof feature.classic === "boolean" ? (
                        feature.classic ? (
                          <Check className="h-5 w-5 text-gold-primary mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        <span className="text-sm text-gray-700">{feature.classic}</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center border-t border-gray-200">
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="h-5 w-5 text-gold-primary mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        <span className="text-sm text-purple-primary font-semibold">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Not sure which package is right for you? Contact our support team for personalized assistance in choosing
            the perfect memorial solution.
          </p>
          <GoldButton href="/contact">Contact Us</GoldButton>
        </div>
      </div>
    </section>
  )
}
