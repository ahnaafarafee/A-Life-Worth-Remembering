import Image from "next/image"
import SectionHeader from "./section-header"

export default function WhyChooseSection() {
  const features = [
    {
      title: "Personalized",
      description:
        "We believe each life story is unique. Our platform allows you to create a personalized online legacy that truly reflects the essence of your life, or the life of someone you love.",
    },
    {
      title: "Easy to Use",
      description:
        "Our platform is user-friendly, with a template that allows you to customize the design of the page easily to reflect the personality of the honoree.",
    },
    {
      title: "Unlimited Content",
      description:
        "Preserve every aspect of your story without limits. Upload unlimited photos, videos, soundbites, and text to create a comprehensive and enduring tribute.",
    },
    {
      title: "Customizable Sections",
      description:
        "Tailor your page to reflect your unique story. Choose which sections you want to publish, from photos and videos to personal anecdotes and achievements, creating a truly personalized legacy page.",
    },
    {
      title: "Lasting Legacy",
      description:
        "Your loved one's legacy deserves to be remembered. We ensure that the memories shared on our platform endure, providing a lasting tribute for generations to come.",
    },
    {
      title: "Secure and Private",
      description:
        "We prioritize the security and privacy of your data. Rest assured that your memories are safe with us, accessible only to those you choose to share them with.",
    },
    {
      title: "Supportive Community",
      description:
        "Join a community of individuals who understand the importance of preserving legacies. Link your pages and share your lives to gain inspiration, and connect with others who are creating a life worth remembering.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Say goodbye to hidden fees. We believe in transparent pricing, offering access to all features without any additional costs. Create a comprehensive tribute without worrying about extra charges.",
    },
    {
      title: "Multiple Administrators",
      description:
        "Sharing the responsibility of curating memories is made easy with multiple administrators. Collaborate with family and friends to add, edit, and approve contributions, ensuring that your loved one's legacy is accurately represented.",
    },
    {
      title: "No Account Required for Guests",
      description:
        "We understand that not everyone may want to create an account. Guests can view and contribute to the legacy page without the need for an account, making it easier for friends and family to participate in celebrating a life worth remembering.",
    },
    {
      title: "Accessible Anytime, Anywhere",
      description:
        "Your memories are accessible from any device with an internet connection. Whether you're at home or on the go, you can revisit and share your loved one's legacy with ease.",
    },
  ]

  return (
    <section className="lwm-why-choose-section max-w-7xl mx-auto py-12 md:py-16 px-5 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-white bg-[radial-gradient(circle_at_90%_10%,rgba(212,175,55,0.03)_0%,rgba(255,255,255,0)_50%),radial-gradient(circle_at_10%_90%,rgba(212,175,55,0.03)_0%,rgba(255,255,255,0)_50%)]"></div>

      {/* Floating hearts for decoration */}
      <div className="absolute w-[25px] h-[25px] top-[10%] left-[5%] opacity-60 animate-float-1">
        <Image src="/images/heart.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute w-[25px] h-[25px] top-[20%] right-[8%] opacity-60 animate-float-2">
        <Image src="/images/heart.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute w-[25px] h-[25px] bottom-[15%] left-[10%] opacity-60 animate-float-3">
        <Image src="/images/heart.png" alt="" fill className="object-contain" />
      </div>

      <SectionHeader
        title="WHY CHOOSE A LIFE WORTH REMEMBERING?"
        subtitle="At 'A Life Worth Remembering,' we understand the profound impact of preserving memories and stories for future generations. Here's why you should choose us to craft your online legacy."
      />

      <div className="lwm-features-container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
        {/* Decorative path - hidden on mobile */}
        <div className="absolute top-0 left-1/2 w-4/5 h-full border-2 border-dashed border-gold-primary/30 rounded-full -translate-x-1/2 z-0 pointer-events-none hidden lg:block"></div>

        {/* Feature cards */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="lwm-feature-card bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover relative z-10"
          >
            <h3 className="lwm-feature-title text-gold-primary text-xl mb-4 font-semibold pl-8 relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5">
                <Image src="/images/heart.png" alt="" width={20} height={20} className="object-contain" />
              </span>
              {feature.title}
            </h3>
            <p className="lwm-feature-description text-gray-600 leading-relaxed text-sm md:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="lwm-final-cta text-center mt-16 p-8 bg-gradient-to-br from-[#fffdf5] to-white rounded-xl shadow-gold-final border border-gold-primary/50">
        <p className="lwm-final-cta-text text-lg md:text-xl text-gold-primary font-medium max-w-3xl mx-auto leading-relaxed">
          Choose "A Life Worth Remembering" to honour a life lived, and ensure that every human story lives on.
        </p>
      </div>
    </section>
  )
}
