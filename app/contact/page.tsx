"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SectionHeader from "@/components/section-header"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitMessage({
        type: "success",
        text: "Thank you for your message. We'll get back to you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              title="CONTACT US"
              subtitle="We're here to help with any questions you may have about our memorial pages or services."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div>
                <div className="bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-8 shadow-gold mb-8">
                  <h3 className="text-2xl font-semibold text-purple-primary mb-6">Get In Touch</h3>
                  <p className="text-gray-700 mb-8">
                    Have questions about our memorial pages or need assistance setting up a tribute for your loved one?
                    Our team is here to help you create a beautiful and lasting memorial.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-gold-primary/20 p-3 rounded-full mr-4">
                        <Mail className="text-gold-primary w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Email Us</h4>
                        <p className="text-gray-600">support@lifeworthremembering.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gold-primary/20 p-3 rounded-full mr-4">
                        <Phone className="text-gold-primary w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Call Us</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Monday to Friday, 9am - 5pm</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gold-primary/20 p-3 rounded-full mr-4">
                        <MapPin className="text-gold-primary w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Office Location</h4>
                        <p className="text-gray-600">
                          123 Memory Lane, Suite 200
                          <br />
                          Remembrance City, RC 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-primary/5 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-purple-primary mb-4">Follow Us</h3>
                  <p className="text-gray-700 mb-4">
                    Connect with us on social media for updates, memorial stories, and tips for preserving memories.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white p-3 rounded-full shadow-sm hover:shadow transition-shadow">
                      <Image src="/images/facebook-icon.png" alt="Facebook" width={24} height={24} />
                    </a>
                    <a href="#" className="bg-white p-3 rounded-full shadow-sm hover:shadow transition-shadow">
                      <Image src="/images/instagram-icon.png" alt="Instagram" width={24} height={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gold-primary/30">
                <h3 className="text-2xl font-semibold text-purple-primary mb-6">Send Us A Message</h3>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg mb-6 ${submitMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-primary focus:border-purple-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-primary focus:border-purple-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-primary focus:border-purple-primary"
                    >
                      <option value="">Please select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Account Support">Account Support</option>
                      <option value="Memorial Setup">Memorial Setup</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-primary focus:border-purple-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-primary hover:bg-gold-primary/90 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
