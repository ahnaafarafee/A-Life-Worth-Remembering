"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoldButton } from "./gold-button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legacyPageId, setLegacyPageId] = useState<string | null>(null);

  useEffect(() => {
    const checkLegacyPage = async () => {
      if (user) {
        try {
          const response = await fetch("/api/legacy-pages/check");
          const data = await response.json();
          if (data.page) {
            setLegacyPageId(data.page.id);
          }
        } catch (error) {
          console.error("Error checking legacy page:", error);
        }
      }
    };

    checkLegacyPage();
  }, [user]);

  return (
    <header className="relative z-10 border-b border-gold-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-gold-primary font-light text-2xl">
              A Life Worth Remembering
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-gold-primary transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-gold-primary transition-colors"
            >
              PRICING PLANS
            </Link>
            <Link
              href="/create-a-page"
              className="text-gray-700 hover:text-gold-primary transition-colors"
            >
              CREATE A PAGE
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gold-primary transition-colors"
            >
              CONTACT US
            </Link>
            {legacyPageId && (
              <Link
                href={`/legacy-pages/${legacyPageId}`}
                className="text-gray-700 hover:text-gold-primary transition-colors"
              >
                My Legacy Page
              </Link>
            )}
            <SignedOut>
              <GoldButton>
                <SignInButton />
              </GoldButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-purple-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg md:hidden z-20">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/about"
              className="text-gray-700 hover:text-gold-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-gold-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              PRICING PLANS
            </Link>
            <Link
              href="/create-a-page"
              className="text-gray-700 hover:text-gold-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              CREATE A PAGE
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gold-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </Link>
            {legacyPageId && (
              <Link
                href={`/legacy-pages/${legacyPageId}`}
                className="text-gray-700 hover:text-gold-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Legacy Page
              </Link>
            )}
            <SignedOut>
              <GoldButton>
                <SignInButton />
              </GoldButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}
