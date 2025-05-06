"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SectionHeader from "@/components/section-header";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  Clock,
  Edit,
  Heart,
  Lightbulb,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  dateTaken: string;
  location: string | null;
  description: string | null;
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
}

interface Relationship {
  id: string;
  type: string;
  name: string;
}

interface GeneralKnowledge {
  personality: string | null;
  values: string | null;
  beliefs: string | null;
}

interface Insight {
  id: string;
  message: string;
}

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

export default function LegacyPageView({ id }: { id: string }) {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [page, setPage] = useState<LegacyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userModel, setUserModel] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        if (mounted) {
          setUserModel(userData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (isUserLoaded) {
      fetchUser();
    }

    return () => {
      mounted = false;
    };
  }, [user, isUserLoaded]);

  useEffect(() => {
    let mounted = true;

    const fetchPage = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/legacy-pages/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch page");
        }
        const data = await response.json();
        if (mounted) {
          setPage(data);
          setIsCreator(userModel?.id === data.userId);
          console.log(
            "userModel.id",
            userModel?.id,
            "data.userId",
            data.userId
          );
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (isUserLoaded && userModel) {
      fetchPage();
    }

    return () => {
      mounted = false;
    };
  }, [id, userModel, isUserLoaded]);

  const handleDelete = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to delete this legacy page? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/legacy-pages/${id}`, {
        method: "DELETE",
      });

      // Log the response for debugging
      console.log("Delete response:", response);

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(`Failed to delete page: ${errorMessage}`);
      }

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the page"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Page not found</div>
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
            <SectionHeader
              title={page.honoureeName}
              subtitle={`A ${page.pageType} created by ${page.creatorName}`}
            />

            {/* Debug info */}

            {isCreator && (
              <div className="flex items-center justify-end gap-4 mb-8">
                <Link
                  href={`/legacy-pages/${id}/edit`}
                  className="flex items-center gap-2 px-6 py-2 bg-gold-primary text-white rounded-md hover:bg-gold-primary/90 transition-colors"
                >
                  <Edit size={20} />
                  <span>Edit Page</span>
                </Link>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                  <span>Delete Page</span>
                </button>

                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Confirm Deletion
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this page? This action
                        cannot be undone.
                      </p>
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="max-w-4xl mx-auto">
              {/* Cover Photo */}
              {page.coverPhoto && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden border-4 border-gold-primary shadow-lg">
                  <Image
                    src={page.coverPhoto}
                    alt={`Cover photo for ${page.honoureeName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Honouree Photo and Basic Info */}
              <div className="flex flex-col md:flex-row gap-8 mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                {page.honoureePhoto && (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gold-primary">
                    <Image
                      src={page.honoureePhoto}
                      alt={page.honoureeName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    About {page.honoureeName}
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    {page.dateOfBirth && (
                      <p>Born: {formatDate(page.dateOfBirth)}</p>
                    )}
                    {page.dateOfPassing && (
                      <p>Passed: {formatDate(page.dateOfPassing)}</p>
                    )}
                    <p>
                      Created by {page.creatorName} ({page.relationship})
                    </p>
                  </div>
                </div>
              </div>

              {/* Story */}
              {page.story && page.story.trim() !== "" && (
                <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Story
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap">{page.story}</div>
                  </div>
                </div>
              )}

              {/* General Knowledge */}
              {page.generalKnowledge && (
                <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    General Knowledge
                  </h3>
                  <div className="space-y-6">
                    {" "}
                    {/* Use space-y-6 for vertical spacing */}
                    {page.generalKnowledge.personality &&
                      page.generalKnowledge.personality.trim() !== "" && (
                        <div className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary">
                          <h4 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <Heart size={24} className="text-gold-primary" />
                            Personality
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {page.generalKnowledge.personality}
                          </p>
                        </div>
                      )}
                    {page.generalKnowledge.values &&
                      page.generalKnowledge.values.trim() !== "" && (
                        <div className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary">
                          <h4 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <Lightbulb
                              size={24}
                              className="text-gold-primary"
                            />
                            Values
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {page.generalKnowledge.values}
                          </p>
                        </div>
                      )}
                    {page.generalKnowledge.beliefs &&
                      page.generalKnowledge.beliefs.trim() !== "" && (
                        <div className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary">
                          <h4 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <Heart size={24} className="text-gold-primary" />
                            Spiritual Beliefs
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {page.generalKnowledge.beliefs}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Media Items */}
              {Array.isArray(page.mediaItems) && page.mediaItems.length > 0 && (
                <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Media Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {page.mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-lg overflow-hidden border-2 border-gold-primary"
                      >
                        {item.type === "image" && item.url && (
                          <div className="relative h-48">
                            <Image
                              src={item.url}
                              alt={item.description || "Media item"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          {item.dateTaken && (
                            <p className="text-sm text-gray-500 mb-2">
                              {formatDate(item.dateTaken)}
                              {item.location && ` • ${item.location}`}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-gray-600">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Relationships */}
              {Array.isArray(page.relationships) &&
                page.relationships.length > 0 && (
                  <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      Relationships
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {page.relationships.map((relationship) => (
                        <div
                          key={relationship.id}
                          className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary"
                        >
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Users size={24} className="text-gold-primary" />
                            <span className="font-medium text-lg">
                              {relationship.type}
                            </span>
                          </div>
                          <p className="text-gray-800 text-lg">
                            {relationship.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Insights */}
              {Array.isArray(page.insights) && page.insights.length > 0 && (
                <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Insights
                  </h3>
                  <div className="space-y-4">
                    {page.insights.map((insight) => (
                      <div
                        key={insight.id}
                        className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary"
                      >
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <Lightbulb size={24} className="text-gold-primary" />
                          <span className="font-medium text-lg">Message</span>
                        </div>
                        <p className="text-gray-800 text-lg">
                          {insight.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events - Moved to bottom */}
              {Array.isArray(page.events) && page.events.length > 0 && (
                <div className="mb-12 p-6 bg-white rounded-lg border-4 border-gold-primary shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Events
                  </h3>
                  <div className="space-y-6">
                    {page.events.map((event) => (
                      <div
                        key={event.id}
                        className="p-6 bg-gray-50 rounded-lg border-2 border-gold-primary"
                      >
                        {event.name && (
                          <h4 className="text-xl font-medium text-gray-800 mb-4">
                            {event.name}
                          </h4>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {event.date && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar
                                size={20}
                                className="text-gold-primary"
                              />
                              <span>{formatDate(event.date)}</span>
                            </div>
                          )}
                          {event.time && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={20} className="text-gold-primary" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={20} className="text-gold-primary" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.rsvpBy && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar
                                size={20}
                                className="text-gold-primary"
                              />
                              <span>RSVP by: {formatDate(event.rsvpBy)}</span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                        )}
                        {event.message && (
                          <div className="bg-white rounded-lg p-4 border-2 border-gold-primary">
                            <p className="text-gray-600 italic">
                              {event.message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
