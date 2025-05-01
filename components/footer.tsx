import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gold-primary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/heart.png" alt="A Life Worth Remembering" width={40} height={40} className="mr-2" />
              <span className="text-gold-primary font-light text-xl">
                A LIFE WORTH <span className="font-bold">REMEMBERING</span>
              </span>
            </Link>
            <p className="text-sm">
              Creating beautiful online memorials to celebrate and remember the lives of your loved ones.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <Image src="/images/facebook-icon.png" alt="Facebook" width={32} height={32} />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <Image src="/images/instagram-icon.png" alt="Instagram" width={32} height={32} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="hover:text-gold-primary transition-colors">
                  Create a Page
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gold-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-gold-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-gold-primary transition-colors">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-gold-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-gold-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-primary/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} A Life Worth Remembering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
