"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SectionHeader from "@/components/section-header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface LegacyPage {
  id: string;
  pageType: string;
  slug: string;
  honoureeName: string;
  dateOfBirth: string;
  dateOfPassing: string | null;
  creatorName: string;
  relationship: string;
  story: string;
  coverPhoto: string | null;
  honoureePhoto: string | null;
  status: string;
  createdAt: string;
  userId: string;
  generalKnowledge: GeneralKnowledge | null;
  mediaItems: MediaItem[];
  events: Event[];
  relationships: Relationship[];
  insights: Insight[];
}

interface GeneralKnowledge {
  id: string;
  personality: string | null;
  values: string | null;
  beliefs: string | null;
  legacyPageId: string;
}

interface MediaItem {
  id: string;
  type: string;
  url: string;
  dateTaken: string;
  location: string | null;
  description: string | null;
  legacyPageId: string;
  file?: File;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  rsvpBy: string | null;
  location: string;
  description: string | null;
  message: string | null;
  legacyPageId: string;
}

interface Relationship {
  id: string;
  type: string;
  name: string;
  legacyPageId: string;
}

interface Insight {
  id: string;
  message: string;
  legacyPageId: string;
}

export default function EditLegacyPage({ id }: { id: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honoureePhotoRef = useRef<HTMLInputElement>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [honoureePhoto, setHonoureePhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [honoureePreviewUrl, setHonoureePreviewUrl] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeceased, setIsDeceased] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [formData, setFormData] = useState({
    pageType: "",
    slug: "",
    honoureeName: "",
    dateOfBirth: "",
    dateOfPassing: "",
    creatorName: "",
    relationship: "",
    story: "",
    personality: "",
    values: "",
    beliefs: "",
  });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/legacy-pages/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch page");
        }
        const data = await response.json();

        setFormData({
          pageType: data.pageType,
          slug: data.slug,
          honoureeName: data.honoureeName,
          dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0],
          dateOfPassing: data.dateOfPassing
            ? new Date(data.dateOfPassing).toISOString().split("T")[0]
            : "",
          creatorName: data.creatorName,
          relationship: data.relationship,
          story: data.story,
          personality: data.generalKnowledge?.personality || "",
          values: data.generalKnowledge?.values || "",
          beliefs: data.generalKnowledge?.beliefs || "",
        });

        setIsDeceased(!!data.dateOfPassing);
        setMediaItems(data.mediaItems || []);
        setEvents(data.events || []);
        setRelationships(data.relationships || []);
        setInsights(data.insights || []);

        if (data.coverPhoto) {
          setPreviewUrl(data.coverPhoto);
        }
        if (data.honoureePhoto) {
          setHonoureePreviewUrl(data.honoureePhoto);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchPage();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submitData = new FormData();

      // Basic form data
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Files
      if (coverPhoto) submitData.append("coverPhoto", coverPhoto);
      if (honoureePhoto) submitData.append("honoureePhoto", honoureePhoto);

      // Media items
      mediaItems.forEach((item, index) => {
        submitData.append(`mediaItems[${index}][type]`, item.type);
        if (item.file) {
          submitData.append(`mediaItems[${index}][file]`, item.file);
        }
        submitData.append(`mediaItems[${index}][dateTaken]`, item.dateTaken);
        submitData.append(
          `mediaItems[${index}][location]`,
          item.location || ""
        );
        submitData.append(
          `mediaItems[${index}][description]`,
          item.description || ""
        );
      });

      // Events
      events.forEach((event, index) => {
        Object.entries(event).forEach(([key, value]) => {
          submitData.append(`events[${index}][${key}]`, value || "");
        });
      });

      // Relationships
      relationships.forEach((relationship, index) => {
        Object.entries(relationship).forEach(([key, value]) => {
          submitData.append(`relationships[${index}][${key}]`, value);
        });
      });

      // Insights
      insights.forEach((insight, index) => {
        submitData.append(`insights[${index}][message]`, insight.message);
      });

      const response = await fetch(`/api/legacy-pages/${id}`, {
        method: "PUT",
        body: submitData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update legacy page");
      }

      router.push(`/legacy-pages/${id}`);
    } catch (error) {
      console.error("Error updating form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the legacy page"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              title="Edit Legacy Page"
              subtitle="Update the information for your loved one's legacy page."
            />

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Basic Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page URL *
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      alifeworthremembering.com/legacy-pages/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-2 border-gold-primary focus:ring-gold-primary focus:border-gold-primary sm:text-sm"
                      placeholder="unique-page-url"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Honouree's Name *
                  </label>
                  <input
                    type="text"
                    name="honoureeName"
                    value={formData.honoureeName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Is the honouree deceased?
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={isDeceased}
                        onChange={(e) => setIsDeceased(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-gold-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                  </div>
                </div>

                {isDeceased && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Passing *
                    </label>
                    <input
                      type="date"
                      name="dateOfPassing"
                      value={formData.dateOfPassing}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="creatorName"
                    value={formData.creatorName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Relationship to the Honouree *
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                  >
                    <option value="">Select a relationship</option>
                    <option value="Child of">Child of</option>
                    <option value="Daughter of">Daughter of</option>
                    <option value="Son of">Son of</option>
                    <option value="Grandchild of">Grandchild of</option>
                    <option value="Nibling of">Nibling of</option>
                    <option value="Sibling of">Sibling of</option>
                    <option value="Spouse of">Spouse of</option>
                    <option value="Parent of">Parent of</option>
                    <option value="Friend of">Friend of</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Story *
                  </label>
                  <textarea
                    name="story"
                    value={formData.story}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    placeholder="Share the story of your loved one..."
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Photo
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    {previewUrl && (
                      <div className="relative w-32 h-32">
                        <Image
                          src={previewUrl}
                          alt="Cover photo preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border-2 border-gold-primary text-gold-primary rounded-md hover:bg-gold-primary hover:text-white transition-colors"
                    >
                      Change Cover Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setCoverPhoto(file);
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Honouree's Photo
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    {honoureePreviewUrl && (
                      <div className="relative w-32 h-32">
                        <Image
                          src={honoureePreviewUrl}
                          alt="Honouree photo preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => honoureePhotoRef.current?.click()}
                      className="px-4 py-2 border-2 border-gold-primary text-gold-primary rounded-md hover:bg-gold-primary hover:text-white transition-colors"
                    >
                      Change Honouree Photo
                    </button>
                    <input
                      type="file"
                      ref={honoureePhotoRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setHonoureePhoto(file);
                          setHonoureePreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* General Knowledge */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  General Knowledge
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personality
                  </label>
                  <textarea
                    name="personality"
                    value={formData.personality}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    placeholder="Describe their personality..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Values
                  </label>
                  <textarea
                    name="values"
                    value={formData.values}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    placeholder="What were their core values?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beliefs
                  </label>
                  <textarea
                    name="beliefs"
                    value={formData.beliefs}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    placeholder="What were their beliefs and principles?"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className={`relative inline-flex items-center justify-center px-16 py-4 text-base font-medium text-purple-primary transition-transform hover:scale-105 cursor-pointer ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/images/button.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative z-10"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Legacy Page"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
