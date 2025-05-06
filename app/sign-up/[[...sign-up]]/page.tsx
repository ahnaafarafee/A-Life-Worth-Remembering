import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SignUp } from "@clerk/nextjs";

export default function AboutPage() {
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
            <div className="flex items-center justify-center">
              <SignUp />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
