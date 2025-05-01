import Image from "next/image"
import SectionHeader from "./section-header"

interface TestimonialProps {
  quote: string
  authorName: string
  authorTitle: string
  authorImage: string
}

const Testimonial = ({ quote, authorName, authorTitle, authorImage }: TestimonialProps) => {
  return (
    <div className="custom-tm-item flex-1 min-w-[300px] p-8 relative bg-transparent">
      <div className="custom-tm-quote text-5xl text-gold-primary font-serif leading-none mb-4">&ldquo;</div>
      <p className="custom-tm-text text-gray-600 leading-relaxed mb-6 text-base">{quote}</p>
      <div className="custom-tm-author flex items-center">
        <div className="custom-tm-img-wrap w-[60px] h-[60px] rounded-full overflow-hidden mr-4 flex-shrink-0">
          <Image
            src={authorImage || "/placeholder.svg"}
            alt={authorName}
            width={60}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="custom-tm-info flex flex-col">
          <span className="custom-tm-name font-bold text-lg text-gray-800">{authorName}</span>
          <span className="custom-tm-title text-purple-primary text-sm mt-0.5">{authorTitle}</span>
        </div>
      </div>
      <div className="custom-tm-bg-circle absolute rounded-full bg-purple-primary/[0.03] z-[1] w-[250px] h-[250px] bottom-[-125px] right-[-60px]"></div>
    </div>
  )
}

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Creating a memorial for my grandmother helped our family heal and celebrate her amazing life. The process was simple yet meaningful, and now we have a beautiful digital space to visit whenever we miss her.",
      authorName: "Sarah Johnson",
      authorTitle: "Family Historian",
      authorImage: "/images/testimonial-1.png",
    },
    {
      quote:
        "I've discovered family stories I never knew existed. This platform has brought our extended family closer together despite living far apart. The collaborative features make it easy for everyone to contribute.",
      authorName: "Michael Chen",
      authorTitle: "Genealogy Enthusiast",
      authorImage: "/images/testimonial-1.png",
    },
    {
      quote:
        "The family tree feature is incredible. We can now visualize our family history in a way that's engaging for even the youngest members. It's become a beautiful way to teach our children about their heritage.",
      authorName: "Emma Rodriguez",
      authorTitle: "Mother of Three",
      authorImage: "/images/testimonial-1.png",
    },
  ]

  return (
    <section className="custom-tm-section py-16 md:py-24 w-full relative overflow-hidden">
      {/* Background circles for decoration */}
      <div className="custom-tm-bg-circle-extra-1 absolute w-[200px] h-[200px] rounded-full bg-purple-primary/[0.02] bottom-[-50px] left-[15%] z-[1]"></div>
      <div className="custom-tm-bg-circle-extra-2 absolute w-[200px] h-[200px] rounded-full bg-purple-primary/[0.02] bottom-[-50px] right-[15%] z-[1]"></div>

      <div className="container mx-auto px-4">
        <SectionHeader
          title="TESTIMONIALS"
          subtitle="Hear from our community about how A Life Worth Remembering has helped them preserve and share their precious memories."
        />

        <div className="custom-tm-container max-w-6xl mx-auto flex flex-wrap justify-between gap-8 relative z-[2] px-4">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              authorImage={testimonial.authorImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
