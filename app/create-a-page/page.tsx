"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SectionHeader from "@/components/section-header";
import { useState, useEffect, useRef } from "react";
import { GoldButton } from "@/components/gold-button";
import { useUser } from "@clerk/nextjs";
import { Upload, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface MediaItem {
  type: "image" | "video";
  file: File;
  dateTaken: string;
  location: string;
  description: string;
}

interface SoundClip {
  file: File;
  dateRecorded: string;
  title: string;
  description: string;
}

interface Event {
  name: string;
  date: string;
  time: string;
  rsvpBy: string;
  location: string;
  geoCode: string;
  externalUrl: string;
  description: string;
  message: string;
  rsvps: {
    name: string;
    email: string;
    attending: boolean;
    message: string;
    date: string;
  }[];
}

interface Relationship {
  type: string;
  name: string;
}

interface Insight {
  message: string;
}

interface CustomField {
  label: string;
  value: string;
}

interface MemorialDetails {
  funeralWishes: string;
  obituary: string;
  funeralHome: string;
  viewing: {
    date: string;
    time: string;
    location: string;
    details: string;
  };
  procession: {
    date: string;
    time: string;
    route: string;
    details: string;
  };
  service: {
    date: string;
    time: string;
    location: string;
    details: string;
  };
  wake: {
    date: string;
    time: string;
    location: string;
    details: string;
  };
  finalRestingPlace: {
    name: string;
    address: string;
    plot: string;
    details: string;
  };
  eulogy: string;
  orderOfService: string;
  familyMessage: string;
  memorialVideo: string;
  tributes: string;
  messageFromHonouree: string;
}

const RELATIONSHIP_TYPES = [
  "Child of",
  "Daughter of",
  "Son of",
  "Grandchild of",
  "Nibling of",
  "Sibling of",
  "Spouse of",
  "Parent of",
  "Friend of",
  "Other",
];

export default function CreateAPage() {
  const router = useRouter();
  const { user } = useUser();
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
  const [existingPage, setExistingPage] = useState<any>(null);
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
  const [isNextOfKin, setIsNextOfKin] = useState(false);
  const [storyHeading, setStoryHeading] = useState("Story");
  const [customRelationshipType, setCustomRelationshipType] = useState("");
  const [showCustomRelationshipInput, setShowCustomRelationshipInput] =
    useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [newCustomField, setNewCustomField] = useState({
    label: "",
    value: "",
  });
  const [soundClips, setSoundClips] = useState<SoundClip[]>([]);
  const [newSoundClip, setNewSoundClip] = useState<SoundClip>({
    file: new File([], ""),
    dateRecorded: "",
    title: "",
    description: "",
  });
  const [showSoundClipForm, setShowSoundClipForm] = useState(false);
  const [memorialDetails, setMemorialDetails] = useState<MemorialDetails>({
    funeralWishes: "",
    obituary: "",
    funeralHome: "",
    viewing: {
      date: "",
      time: "",
      location: "",
      details: "",
    },
    procession: {
      date: "",
      time: "",
      route: "",
      details: "",
    },
    service: {
      date: "",
      time: "",
      location: "",
      details: "",
    },
    wake: {
      date: "",
      time: "",
      location: "",
      details: "",
    },
    finalRestingPlace: {
      name: "",
      address: "",
      plot: "",
      details: "",
    },
    eulogy: "",
    orderOfService: "",
    familyMessage: "",
    memorialVideo: "",
    tributes: "",
    messageFromHonouree: "",
  });

  useEffect(() => {
    const checkExistingPage = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/legacy-pages/check`);
          const data = await response.json();
          if (data.page) {
            setExistingPage(data.page);
          }
        } catch (error) {
          console.error("Error checking existing page:", error);
        }
      }
    };

    checkExistingPage();
  }, [user]);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          const data = await response.json();
          if (data.name) {
            setFormData((prev) => ({
              ...prev,
              creatorName: data.name,
            }));
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleHonoureePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setHonoureePhoto(file);
      const url = URL.createObjectURL(file);
      setHonoureePreviewUrl(url);
    }
  };

  const handleMediaItemAdd = () => {
    setMediaItems([
      ...mediaItems,
      {
        type: "image",
        file: new File([], ""),
        dateTaken: "",
        location: "",
        description: "",
      },
    ]);
  };

  const handleMediaItemChange = (
    index: number,
    field: keyof MediaItem,
    value: string | File
  ) => {
    const newMediaItems = [...mediaItems];
    newMediaItems[index] = {
      ...newMediaItems[index],
      [field]: value,
    };
    setMediaItems(newMediaItems);
  };

  const handleMediaItemRemove = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
  };

  const handleEventAdd = () => {
    setEvents([
      ...events,
      {
        name: "",
        date: "",
        time: "",
        rsvpBy: "",
        location: "",
        geoCode: "",
        externalUrl: "",
        description: "",
        message: "",
        rsvps: [],
      },
    ]);
  };

  const handleEventChange = (
    index: number,
    field: keyof Event,
    value: string
  ) => {
    const newEvents = [...events];
    newEvents[index] = {
      ...newEvents[index],
      [field]: value,
    };
    setEvents(newEvents);
  };

  const handleEventRemove = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleRelationshipAdd = () => {
    setRelationships([
      ...relationships,
      {
        type: "",
        name: "",
      },
    ]);
  };

  const handleRelationshipChange = (
    index: number,
    field: keyof Relationship,
    value: string
  ) => {
    const newRelationships = [...relationships];
    newRelationships[index] = {
      ...newRelationships[index],
      [field]: value,
    };
    setRelationships(newRelationships);
  };

  const handleRelationshipRemove = (index: number) => {
    setRelationships(relationships.filter((_, i) => i !== index));
  };

  const handleInsightAdd = () => {
    setInsights([...insights, { message: "" }]);
  };

  const handleInsightChange = (index: number, value: string) => {
    const newInsights = [...insights];
    newInsights[index] = {
      ...newInsights[index],
      message: value,
    };
    setInsights(newInsights);
  };

  const handleInsightRemove = (index: number) => {
    setInsights(insights.filter((_, i) => i !== index));
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
        submitData.append(`mediaItems[${index}][file]`, item.file);
        submitData.append(`mediaItems[${index}][dateTaken]`, item.dateTaken);
        submitData.append(`mediaItems[${index}][location]`, item.location);
        submitData.append(
          `mediaItems[${index}][description]`,
          item.description
        );
      });

      // Events
      events.forEach((event, index) => {
        Object.entries(event).forEach(([key, value]) => {
          submitData.append(`events[${index}][${key}]`, value);
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

      const response = await fetch("/api/legacy-pages", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create legacy page");
      }

      const data = await response.json();
      if (!data.id) {
        throw new Error("No page ID received from server");
      }

      router.push(`/legacy-pages/${data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while creating the legacy page"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (existingPage) {
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
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                You already have a legacy page
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Each user can create only one legacy page. You can view your
                existing page below.
              </p>
              <a
                href={`/legacy-pages/${existingPage.id}`}
                className="inline-block px-8 py-3 bg-gold-primary text-white rounded-md hover:bg-gold-primary/90 transition-colors"
              >
                View My Legacy Page
              </a>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
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
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/gold-logo.png"
                  alt="Gold Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Create A Legacy Page
              </h1>
              <p className="text-xl text-gray-600">
                Take your time to create a meaningful page for yourself or a
                loved one.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
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
                    <p className="mt-1 text-sm text-gray-500">
                      This will be the unique URL for your legacy page. Use only
                      letters, numbers, and hyphens.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="pageType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Page Type *
                    </label>
                    <select
                      id="pageType"
                      name="pageType"
                      value={formData.pageType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    >
                      <option value="">Select a page type</option>
                      <option value="autobiography">Autobiography</option>
                      <option value="biography">Biography</option>
                      <option value="memorial">Memorial</option>
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.pageType === "autobiography" &&
                        "A firsthand story created by the honouree, providing a personal account of their life."}
                      {formData.pageType === "biography" &&
                        "A page created for a child or adult who is unable to create the page themselves. It is crafted by the next of kin or someone with legal authority to act on behalf of the honouree."}
                      {formData.pageType === "memorial" &&
                        "A page dedicated to the memory of an individual, created by the next of kin or someone with legal authority to act on behalf of the honouree."}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="honoureeName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Honouree's Name *
                    </label>
                    <input
                      type="text"
                      id="honoureeName"
                      name="honoureeName"
                      value={formData.honoureeName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Honouree's Photo *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gold-primary border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {honoureePreviewUrl ? (
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={honoureePreviewUrl}
                              alt="Honouree photo preview"
                              fill
                              className="object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setHonoureePhoto(null);
                                setHonoureePreviewUrl(null);
                                if (honoureePhotoRef.current) {
                                  honoureePhotoRef.current.value = "";
                                }
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="honouree-photo"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-gold-primary hover:text-gold-primary/80 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="honouree-photo"
                              name="honouree-photo"
                              type="file"
                              ref={honoureePhotoRef}
                              accept="image/*"
                              onChange={handleHonoureePhotoChange}
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB. Recommended size: 800x800
                          pixels minimum
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isDeceased"
                      checked={isDeceased}
                      onChange={(e) => setIsDeceased(e.target.checked)}
                      className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isDeceased"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Honouree has transitioned
                    </label>
                  </div>

                  {(formData.pageType === "biography" ||
                    formData.pageType === "memorial") && (
                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="isNextOfKin"
                        checked={isNextOfKin}
                        onChange={(e) => setIsNextOfKin(e.target.checked)}
                        required
                        className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isNextOfKin"
                        className="block text-sm font-medium text-gray-700"
                      >
                        I confirm that I am the next of kin and have legal
                        authority to create this page on behalf of the honouree
                      </label>
                    </div>
                  )}

                  {isDeceased && (
                    <div>
                      <label
                        htmlFor="dateOfPassing"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Date of Passing *
                      </label>
                      <input
                        type="date"
                        id="dateOfPassing"
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
                      Cover Photo *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gold-primary border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {previewUrl ? (
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={previewUrl}
                              alt="Cover photo preview"
                              fill
                              className="object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCoverPhoto(null);
                                setPreviewUrl(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="cover-photo"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-gold-primary hover:text-gold-primary/80 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="cover-photo"
                              name="cover-photo"
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={handleFileChange}
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB. Recommended size: 1920x1080
                          pixels minimum
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="creatorName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="creatorName"
                      name="creatorName"
                      value={formData.creatorName}
                      onChange={handleChange}
                      required
                      readOnly
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="relationship"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Relationship to Honouree *
                    </label>
                    <input
                      type="text"
                      id="relationship"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <label
                        htmlFor="storyHeading"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Section Heading
                      </label>
                      <input
                        type="text"
                        id="storyHeading"
                        value={storyHeading}
                        onChange={(e) => setStoryHeading(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                        placeholder="Enter section heading"
                      />
                    </div>
                    <label
                      htmlFor="story"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {storyHeading}
                    </label>
                    <textarea
                      id="story"
                      name="story"
                      value={formData.story}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Share the story of your loved one..."
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Share the memories, experiences, and legacy of your loved
                      one. This will be the main content of their page.
                    </p>
                  </div>
                </div>

                {/* Add Memorial Details section after Basic Information */}
                {formData.pageType === "memorial" && (
                  <div className="space-y-6 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Memorial Details
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Funeral Wishes
                      </label>
                      <textarea
                        value={memorialDetails.funeralWishes}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            funeralWishes: e.target.value,
                          })
                        }
                        rows={4}
                        placeholder="Enter any specific wishes for the funeral..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Obituary
                      </label>
                      <textarea
                        value={memorialDetails.obituary}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            obituary: e.target.value,
                          })
                        }
                        rows={6}
                        placeholder="Enter the obituary text..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Funeral Home
                      </label>
                      <input
                        type="text"
                        value={memorialDetails.funeralHome}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            funeralHome: e.target.value,
                          })
                        }
                        placeholder="Enter the funeral home name and contact information"
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                      />
                    </div>

                    {/* Viewing Details */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Viewing Details
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={memorialDetails.viewing.date}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  viewing: {
                                    ...memorialDetails.viewing,
                                    date: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time
                            </label>
                            <input
                              type="time"
                              value={memorialDetails.viewing.time}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  viewing: {
                                    ...memorialDetails.viewing,
                                    time: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.viewing.location}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                viewing: {
                                  ...memorialDetails.viewing,
                                  location: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            value={memorialDetails.viewing.details}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                viewing: {
                                  ...memorialDetails.viewing,
                                  details: e.target.value,
                                },
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Procession Details */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Procession Details
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={memorialDetails.procession.date}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  procession: {
                                    ...memorialDetails.procession,
                                    date: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time
                            </label>
                            <input
                              type="time"
                              value={memorialDetails.procession.time}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  procession: {
                                    ...memorialDetails.procession,
                                    time: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Route
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.procession.route}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                procession: {
                                  ...memorialDetails.procession,
                                  route: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            value={memorialDetails.procession.details}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                procession: {
                                  ...memorialDetails.procession,
                                  details: e.target.value,
                                },
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Service Details
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={memorialDetails.service.date}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  service: {
                                    ...memorialDetails.service,
                                    date: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time
                            </label>
                            <input
                              type="time"
                              value={memorialDetails.service.time}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  service: {
                                    ...memorialDetails.service,
                                    time: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.service.location}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                service: {
                                  ...memorialDetails.service,
                                  location: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            value={memorialDetails.service.details}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                service: {
                                  ...memorialDetails.service,
                                  details: e.target.value,
                                },
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Wake Details */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Wake Details
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={memorialDetails.wake.date}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  wake: {
                                    ...memorialDetails.wake,
                                    date: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time
                            </label>
                            <input
                              type="time"
                              value={memorialDetails.wake.time}
                              onChange={(e) =>
                                setMemorialDetails({
                                  ...memorialDetails,
                                  wake: {
                                    ...memorialDetails.wake,
                                    time: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.wake.location}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                wake: {
                                  ...memorialDetails.wake,
                                  location: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            value={memorialDetails.wake.details}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                wake: {
                                  ...memorialDetails.wake,
                                  details: e.target.value,
                                },
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Final Resting Place */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Final Resting Place
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name of Cemetery/Memorial
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.finalRestingPlace.name}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                finalRestingPlace: {
                                  ...memorialDetails.finalRestingPlace,
                                  name: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.finalRestingPlace.address}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                finalRestingPlace: {
                                  ...memorialDetails.finalRestingPlace,
                                  address: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plot/Section
                          </label>
                          <input
                            type="text"
                            value={memorialDetails.finalRestingPlace.plot}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                finalRestingPlace: {
                                  ...memorialDetails.finalRestingPlace,
                                  plot: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            value={memorialDetails.finalRestingPlace.details}
                            onChange={(e) =>
                              setMemorialDetails({
                                ...memorialDetails,
                                finalRestingPlace: {
                                  ...memorialDetails.finalRestingPlace,
                                  details: e.target.value,
                                },
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Eulogy
                      </label>
                      <textarea
                        value={memorialDetails.eulogy}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            eulogy: e.target.value,
                          })
                        }
                        rows={6}
                        placeholder="Enter the eulogy text..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order of Service
                      </label>
                      <textarea
                        value={memorialDetails.orderOfService}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            orderOfService: e.target.value,
                          })
                        }
                        rows={6}
                        placeholder="Enter the order of service..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Family Message
                      </label>
                      <textarea
                        value={memorialDetails.familyMessage}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            familyMessage: e.target.value,
                          })
                        }
                        rows={4}
                        placeholder="Enter a message from the family..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Memorial Video URL
                      </label>
                      <input
                        type="url"
                        value={memorialDetails.memorialVideo}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            memorialVideo: e.target.value,
                          })
                        }
                        placeholder="Enter the URL of the memorial video..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tributes
                      </label>
                      <textarea
                        value={memorialDetails.tributes}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            tributes: e.target.value,
                          })
                        }
                        rows={6}
                        placeholder="Enter tributes from friends and family..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message from Honouree
                      </label>
                      <textarea
                        value={memorialDetails.messageFromHonouree}
                        onChange={(e) =>
                          setMemorialDetails({
                            ...memorialDetails,
                            messageFromHonouree: e.target.value,
                          })
                        }
                        rows={4}
                        placeholder="Enter any final message from the honouree..."
                        className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Media Items */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Gallery
                    </h2>
                    <button
                      type="button"
                      onClick={handleMediaItemAdd}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Media
                    </button>
                  </div>

                  {mediaItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gold-primary rounded-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Media Item {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleMediaItemRemove(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type *
                          </label>
                          <select
                            value={item.type}
                            onChange={(e) =>
                              handleMediaItemChange(
                                index,
                                "type",
                                e.target.value as "image" | "video"
                              )
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            File *
                          </label>
                          <input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file)
                                handleMediaItemChange(index, "file", file);
                            }}
                            accept={
                              item.type === "image" ? "image/*" : "video/*"
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Taken *
                          </label>
                          <input
                            type="date"
                            value={item.dateTaken}
                            onChange={(e) =>
                              handleMediaItemChange(
                                index,
                                "dateTaken",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={item.location}
                            onChange={(e) =>
                              handleMediaItemChange(
                                index,
                                "location",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              handleMediaItemChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Update Sound Clips section */}
                <div className="space-y-6 mt-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Sound Clips
                    </h2>
                    <button
                      type="button"
                      onClick={() => setShowSoundClipForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Sound Clip
                    </button>
                  </div>

                  {soundClips.map((clip, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gold-primary rounded-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Sound Clip {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setSoundClips(
                              soundClips.filter((_, i) => i !== index)
                            );
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            value={clip.title}
                            onChange={(e) => {
                              const newClips = [...soundClips];
                              newClips[index].title = e.target.value;
                              setSoundClips(newClips);
                            }}
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Audio File *
                          </label>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const newClips = [...soundClips];
                                newClips[index].file = file;
                                setSoundClips(newClips);
                              }
                            }}
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Recorded *
                          </label>
                          <input
                            type="date"
                            value={clip.dateRecorded}
                            onChange={(e) => {
                              const newClips = [...soundClips];
                              newClips[index].dateRecorded = e.target.value;
                              setSoundClips(newClips);
                            }}
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={clip.description}
                            onChange={(e) => {
                              const newClips = [...soundClips];
                              newClips[index].description = e.target.value;
                              setSoundClips(newClips);
                            }}
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Sound Clip Form - Only shown when showSoundClipForm is true */}
                  {showSoundClipForm && (
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Add New Sound Clip
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSoundClipForm(false);
                            setNewSoundClip({
                              file: new File([], ""),
                              dateRecorded: "",
                              title: "",
                              description: "",
                            });
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            value={newSoundClip.title}
                            onChange={(e) =>
                              setNewSoundClip({
                                ...newSoundClip,
                                title: e.target.value,
                              })
                            }
                            placeholder="Enter a title for the sound clip"
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Audio File *
                          </label>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setNewSoundClip({ ...newSoundClip, file });
                              }
                            }}
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Recorded *
                          </label>
                          <input
                            type="date"
                            value={newSoundClip.dateRecorded}
                            onChange={(e) =>
                              setNewSoundClip({
                                ...newSoundClip,
                                dateRecorded: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newSoundClip.description}
                            onChange={(e) =>
                              setNewSoundClip({
                                ...newSoundClip,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                            placeholder="Enter a description for the sound clip"
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                newSoundClip.file.size > 0 &&
                                newSoundClip.title.trim()
                              ) {
                                setSoundClips([
                                  ...soundClips,
                                  { ...newSoundClip },
                                ]);
                                setNewSoundClip({
                                  file: new File([], ""),
                                  dateRecorded: "",
                                  title: "",
                                  description: "",
                                });
                                setShowSoundClipForm(false);
                              }
                            }}
                            className="px-4 py-2 bg-gold-primary text-white rounded-md hover:bg-gold-primary/90"
                          >
                            Add Sound Clip
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Events
                    </h2>
                    <button
                      type="button"
                      onClick={handleEventAdd}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </button>
                  </div>

                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gold-primary rounded-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Event {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEventRemove(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Name *
                          </label>
                          <input
                            type="text"
                            value={event.name}
                            onChange={(e) =>
                              handleEventChange(index, "name", e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date *
                            </label>
                            <input
                              type="date"
                              value={event.date}
                              onChange={(e) =>
                                handleEventChange(index, "date", e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Time *
                            </label>
                            <input
                              type="time"
                              value={event.time}
                              onChange={(e) =>
                                handleEventChange(index, "time", e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            RSVP By
                          </label>
                          <input
                            type="datetime-local"
                            value={event.rsvpBy}
                            onChange={(e) =>
                              handleEventChange(index, "rsvpBy", e.target.value)
                            }
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location *
                          </label>
                          <input
                            type="text"
                            value={event.location}
                            onChange={(e) =>
                              handleEventChange(
                                index,
                                "location",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Google Maps GEO Code
                          </label>
                          <input
                            type="text"
                            value={event.geoCode}
                            onChange={(e) =>
                              handleEventChange(
                                index,
                                "geoCode",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 40.7128,-74.0060"
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Enter the latitude and longitude coordinates for the
                            event location
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            External Event URL
                          </label>
                          <input
                            type="url"
                            value={event.externalUrl}
                            onChange={(e) =>
                              handleEventChange(
                                index,
                                "externalUrl",
                                e.target.value
                              )
                            }
                            placeholder="e.g., https://facebook.com/event/123 or https://zoom.us/j/123456"
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Add a link to the event on Facebook, Zoom, or other
                            platforms
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            value={event.message}
                            onChange={(e) =>
                              handleEventChange(
                                index,
                                "message",
                                e.target.value
                              )
                            }
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>

                        {/* Add RSVP list viewer for event creators */}
                        {event.rsvps && event.rsvps.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-900 mb-2">
                              RSVP List
                            </h4>
                            <div className="border-2 border-gold-primary rounded-md p-4">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                      Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                      Email
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                      Attending
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                      Message
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                      Date
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {event.rsvps.map((rsvp, rsvpIndex) => (
                                    <tr key={rsvpIndex}>
                                      <td className="px-4 py-2 text-sm text-gray-900">
                                        {rsvp.name}
                                      </td>
                                      <td className="px-4 py-2 text-sm text-gray-900">
                                        {rsvp.email}
                                      </td>
                                      <td className="px-4 py-2 text-sm text-gray-900">
                                        {rsvp.attending ? "Yes" : "No"}
                                      </td>
                                      <td className="px-4 py-2 text-sm text-gray-900">
                                        {rsvp.message}
                                      </td>
                                      <td className="px-4 py-2 text-sm text-gray-900">
                                        {new Date(
                                          rsvp.date
                                        ).toLocaleDateString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Relationships */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Relationships
                    </h2>
                    <button
                      type="button"
                      onClick={handleRelationshipAdd}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Relationship
                    </button>
                  </div>

                  {relationships.map((relationship, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gold-primary rounded-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Relationship {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleRelationshipRemove(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Relationship Type *
                          </label>
                          <div className="space-y-2">
                            <select
                              value={relationship.type}
                              onChange={(e) => {
                                if (e.target.value === "custom") {
                                  setShowCustomRelationshipInput(true);
                                } else {
                                  setShowCustomRelationshipInput(false);
                                  handleRelationshipChange(
                                    index,
                                    "type",
                                    e.target.value
                                  );
                                }
                              }}
                              required
                              className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                            >
                              <option value="">
                                Select a relationship type
                              </option>
                              {RELATIONSHIP_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                              <option value="custom">Add Custom Type</option>
                            </select>

                            {showCustomRelationshipInput && (
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={customRelationshipType}
                                  onChange={(e) =>
                                    setCustomRelationshipType(e.target.value)
                                  }
                                  placeholder="Enter custom relationship type"
                                  className="flex-1 px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (customRelationshipType.trim()) {
                                      handleRelationshipChange(
                                        index,
                                        "type",
                                        customRelationshipType.trim()
                                      );
                                      setCustomRelationshipType("");
                                      setShowCustomRelationshipInput(false);
                                    }
                                  }}
                                  className="px-4 py-2 bg-gold-primary text-white rounded-md hover:bg-gold-primary/90"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={relationship.name}
                            onChange={(e) =>
                              handleRelationshipChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* General Knowledge */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      General Knowledge
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        if (newCustomField.label.trim()) {
                          setCustomFields([
                            ...customFields,
                            { ...newCustomField },
                          ]);
                          setNewCustomField({ label: "", value: "" });
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Field
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor="personality"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Personality
                    </label>
                    <textarea
                      id="personality"
                      name="personality"
                      value={formData.personality}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the honouree's personality..."
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="values"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Values
                    </label>
                    <textarea
                      id="values"
                      name="values"
                      value={formData.values}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What values were important to the honouree?"
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="beliefs"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Spiritual Beliefs
                    </label>
                    <textarea
                      id="beliefs"
                      name="beliefs"
                      value={formData.beliefs}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What were the honouree's spiritual beliefs?"
                      className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                    />
                  </div>

                  {/* Custom Fields */}
                  <div className="space-y-4">
                    {customFields.map((field, index) => (
                      <div key={index} className="relative">
                        <div className="flex justify-between items-start mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomFields(
                                customFields.filter((_, i) => i !== index)
                              );
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <textarea
                          value={field.value}
                          onChange={(e) => {
                            const newFields = [...customFields];
                            newFields[index].value = e.target.value;
                            setCustomFields(newFields);
                          }}
                          rows={4}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                        />
                      </div>
                    ))}

                    {/* Add New Custom Field Form */}
                    <div className="border-2 border-gold-primary rounded-md p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Add Custom Field
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field Label
                          </label>
                          <input
                            type="text"
                            value={newCustomField.label}
                            onChange={(e) =>
                              setNewCustomField({
                                ...newCustomField,
                                label: e.target.value,
                              })
                            }
                            placeholder="e.g., Hobbies, Achievements, Life Lessons"
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field Value
                          </label>
                          <textarea
                            value={newCustomField.value}
                            onChange={(e) =>
                              setNewCustomField({
                                ...newCustomField,
                                value: e.target.value,
                              })
                            }
                            rows={4}
                            placeholder="Enter the content for this field..."
                            className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Insights
                    </h2>
                    <button
                      type="button"
                      onClick={handleInsightAdd}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-primary hover:bg-gold-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Insight
                    </button>
                  </div>

                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gold-primary rounded-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Insight {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleInsightRemove(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <textarea
                          value={insight.message}
                          onChange={(e) =>
                            handleInsightChange(index, e.target.value)
                          }
                          rows={3}
                          placeholder="Something I would like people to remember me by is..."
                          required
                          className="w-full px-4 py-2 border-2 border-gold-primary rounded-md focus:ring-gold-primary focus:border-gold-primary resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center space-y-4">
                  {error && (
                    <div className="w-full max-w-4xl p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-center">{error}</p>
                    </div>
                  )}

                  <div
                    className={`relative inline-flex items-center justify-center px-16 py-4 text-base font-medium text-purple-primary transition-transform hover:scale-105 ${
                      isSubmitting ||
                      ((formData.pageType === "biography" ||
                        formData.pageType === "memorial") &&
                        !isNextOfKin)
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
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
                      disabled={
                        isSubmitting ||
                        ((formData.pageType === "biography" ||
                          formData.pageType === "memorial") &&
                          !isNextOfKin)
                      }
                    >
                      {isSubmitting ? "Creating..." : "Create a Legacy Page"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
