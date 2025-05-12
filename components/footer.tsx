import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-16 border-t border-gold-primary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="A Life Worth Remembering"
                width={48}
                height={48}
                className="mr-3"
              />
              <span className="text-gold-primary font-light text-2xl">
                A LIFE WORTH <span className="font-bold">REMEMBERING</span>
              </span>
            </Link>
            <p className="text-base text-gray-600 leading-relaxed">
              Creating beautiful online memorials to celebrate and remember the
              lives of your loved ones.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/facebook-icon.png"
                  alt="Facebook"
                  width={36}
                  height={36}
                />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/instagram-icon.png"
                  alt="Instagram"
                  width={36}
                  height={36}
                />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/create"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Create a Page
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold text-lg mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-gold-primary transition-colors text-gray-600"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-primary/20 mt-12 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} A Life Worth Remembering. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
