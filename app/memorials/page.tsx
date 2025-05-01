import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { GoldButton } from "@/components/gold-button"
import { Search, Filter, Calendar, User, MapPin, Heart, ChevronRight } from "lucide-react"
import SectionHeader from "@/components/section-header"

interface MemorialCardProps {
  name: string
  years: string
  createdBy: string
  imageSrc: string
  href: string
  location?: string
  category?: string
  featured?: boolean
}

const MemorialCard = ({
  name,
  years,
  createdBy,
  imageSrc,
  href,
  location,
  category,
  featured = false,
}: MemorialCardProps) => {
  return (
    <div
      className={`memorial-card group relative ${featured ? "md:col-span-2 md:row-span-2 h-[500px] md:h-full" : "h-[400px]"} rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2`}
    >
      {/* Gold border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-primary to-gold-secondary opacity-70 p-[2px]">
        <div className="absolute inset-0 bg-black/20 rounded-xl backdrop-blur-[1px]"></div>
      </div>

      {/* Card content */}
      <div className="absolute inset-[2px] rounded-lg overflow-hidden bg-white">
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={`Memorial of ${name}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 bg-gold-primary text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              Featured
            </div>
          )}

          {/* Category badge */}
          {category && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-primary text-xs font-medium px-2.5 py-1 rounded-full">
              {category}
            </div>
          )}

          {/* Heart icon with pulse effect */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative">
              <Heart className="w-6 h-6 text-gold-primary animate-pulse" />
              <div className="absolute inset-0 bg-gold-primary rounded-full animate-ping opacity-30"></div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className={`${featured ? "text-3xl" : "text-2xl"} font-semibold mb-1`}>{name}</h3>
            <p className="text-gold-primary font-medium mb-3">{years}</p>

            {/* Additional details */}
            {location && (
              <div className="flex items-center mb-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>{location}</span>
              </div>
            )}

            {featured && (
              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                A beautiful tribute to a life well-lived. Click to explore the full memorial page and discover the
                stories, photos, and memories that made this life special.
              </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <span className="text-sm text-white/70 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5" />
                Created by {createdBy}
              </span>
              <Link
                href={href}
                className="inline-flex items-center text-sm font-medium text-gold-primary hover:text-gold-secondary transition-colors"
              >
                View Page
                <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MemorialsPage() {
  const categories = ["All", "Recent", "Family", "Historical", "Veterans", "Community", "Children", "Celebrities"]

  const memorials = [
    {
      name: "Sarah Johnson",
      years: "1975 - 2022",
      createdBy: "James",
      imageSrc: "/images/featured-1.png",
      href: "/memorials/sarah-johnson",
      location: "New York, USA",
      category: "Family",
      featured: true,
    },
    {
      name: "Robert Thompson",
      years: "1942 - 2023",
      createdBy: "Emily",
      imageSrc: "/images/featured-2.jpg",
      href: "/memorials/robert-thompson",
      location: "London, UK",
      category: "Veterans",
    },
    {
      name: "Michael Anderson",
      years: "1968 - 2021",
      createdBy: "Lisa",
      imageSrc: "/images/featured-3.png",
      href: "/memorials/michael-anderson",
      location: "Chicago, USA",
      category: "Recent",
    },
    {
      name: "Rebecca Martinez",
      years: "1985 - 2023",
      createdBy: "David",
      imageSrc: "/images/featured-4.png",
      href: "/memorials/rebecca-martinez",
      location: "Toronto, Canada",
      category: "Family",
    },
    {
      name: "William Davis",
      years: "1920 - 2010",
      createdBy: "Thomas",
      imageSrc: "/vintage-elderly-man.png",
      href: "/memorials/william-davis",
      location: "Boston, USA",
      category: "Historical",
    },
    {
      name: "Elizabeth Wilson",
      years: "1950 - 2022",
      createdBy: "Jennifer",
      imageSrc: "/elderly-woman-smiling-portrait.png",
      href: "/memorials/elizabeth-wilson",
      location: "Sydney, Australia",
      category: "Community",
    },
    {
      name: "James Peterson",
      years: "1930 - 2020",
      createdBy: "Michael",
      imageSrc: "/dignified-senior-man.png",
      href: "/memorials/james-peterson",
      location: "Dublin, Ireland",
      category: "Veterans",
    },
    {
      name: "Maria Gonzalez",
      years: "1965 - 2023",
      createdBy: "Carlos",
      imageSrc: "/warm-middle-aged-woman.png",
      href: "/memorials/maria-gonzalez",
      location: "Madrid, Spain",
      category: "Recent",
    },
    {
      name: "David Chen",
      years: "1980 - 2022",
      createdBy: "Michelle",
      imageSrc: "/young-asian-man-portrait.png",
      href: "/memorials/david-chen",
      location: "Singapore",
      category: "Recent",
    },
  ]

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
          <div className="container mx-auto px-4">
            <SectionHeader
              title="MEMORIAL PAGES"
              subtitle="Explore our collection of memorial pages created by our community to honor and remember their loved ones."
            />

            {/* Advanced search and filter */}
            <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-purple-primary focus:border-purple-primary outline-none"
                    placeholder="Search by name..."
                  />
                </div>

                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-purple-primary focus:border-purple-primary outline-none"
                    placeholder="Location..."
                  />
                </div>

                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-purple-primary focus:border-purple-primary outline-none"
                    placeholder="Year..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-700 flex items-center">
                  <Filter className="w-4 h-4 mr-1" />
                  Categories:
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <button className="w-full md:w-auto bg-purple-primary text-white px-4 py-2 rounded-lg hover:bg-purple-primary/90 transition-colors">
                Search Memorials
              </button>
            </div>

            {/* Memorial grid with featured item */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-auto">
              {memorials.map((memorial, index) => (
                <MemorialCard
                  key={index}
                  name={memorial.name}
                  years={memorial.years}
                  createdBy={memorial.createdBy}
                  imageSrc={memorial.imageSrc}
                  href={memorial.href}
                  location={memorial.location}
                  category={memorial.category}
                  featured={memorial.featured}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-primary text-white">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                3
              </button>

              <span className="text-gray-500">...</span>

              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                12
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-light text-purple-primary mb-4">Create Your Own Memorial Page</h3>
              <p className="text-gray-600 mb-6">
                Honor your loved one with a beautiful, personalized memorial page that preserves their memory for
                generations to come.
              </p>
              <GoldButton href="/create">Create a Memorial</GoldButton>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
