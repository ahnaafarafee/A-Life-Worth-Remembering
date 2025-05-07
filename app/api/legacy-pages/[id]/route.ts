import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";
import { uploadFile, deleteFile } from "@/lib/supabase";

interface LegacyPage {
  id: string;
  pageType: string;
  slug: string;
  honoureeName: string;
  dateOfBirth: Date;
  dateOfPassing: Date | null;
  creatorName: string;
  relationship: string;
  story: string;
  coverPhoto: string | null;
  honoureePhoto: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface GeneralKnowledge {
  id: string;
  personality: string | null;
  values: string | null;
  beliefs: string | null;
  legacyPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MediaItem {
  id: string;
  type: string;
  url: string;
  dateTaken: Date;
  location: string | null;
  description: string | null;
  legacyPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Event {
  id: string;
  name: string;
  date: Date;
  time: string;
  rsvpBy: Date | null;
  location: string;
  description: string | null;
  message: string | null;
  legacyPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Relationship {
  id: string;
  type: string;
  name: string;
  legacyPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Insight {
  id: string;
  message: string;
  legacyPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(params.id);
    if (!id) {
      return NextResponse.json(
        { error: "Page ID is required" },
        { status: 400 }
      );
    }

    // Use Prisma's include to fetch all related data in a single query
    const page = await prisma.legacyPage.findUnique({
      where: { id: id },
      include: {
        generalKnowledge: true,
        mediaItems: true,
        events: true,
        relationships: true,
        insights: true,
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Legacy page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching legacy page:", error);
    return NextResponse.json(
      { error: "Error fetching legacy page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(params.id);
    if (!id) {
      return NextResponse.json(
        { error: "Page ID is required" },
        { status: 400 }
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the page to check ownership and get file paths
    const page = await prisma.legacyPage.findUnique({
      where: { id: id },
      include: {
        mediaItems: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    if (page.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this page" },
        { status: 403 }
      );
    }

    // Delete files from Supabase storage
    try {
      // Delete cover photo
      if (page.coverPhoto) {
        const coverPhotoPath = page.coverPhoto.split("/").pop();
        if (coverPhotoPath) {
          await deleteFile("legacy-pages", `cover-photos/${coverPhotoPath}`);
        }
      }

      // Delete honouree photo
      if (page.honoureePhoto) {
        const honoureePhotoPath = page.honoureePhoto.split("/").pop();
        if (honoureePhotoPath) {
          await deleteFile(
            "legacy-pages",
            `honouree-photos/${honoureePhotoPath}`
          );
        }
      }

      // Delete media files
      for (const mediaItem of page.mediaItems) {
        const mediaPath = mediaItem.url.split("/").pop();
        if (mediaPath) {
          await deleteFile("legacy-pages", `media/${mediaPath}`);
        }
      }
    } catch (error) {
      console.error("Error deleting files from storage:", error);
    }

    // Delete related data first
    await prisma.$transaction([
      // Delete media items
      prisma.mediaItem.deleteMany({
        where: { legacyPageId: id },
      }),
      // Delete events
      prisma.event.deleteMany({
        where: { legacyPageId: id },
      }),
      // Delete relationships
      prisma.relationship.deleteMany({
        where: { legacyPageId: id },
      }),
      // Delete insights
      prisma.insight.deleteMany({
        where: { legacyPageId: id },
      }),
      // Delete general knowledge
      prisma.generalKnowledge.deleteMany({
        where: { legacyPageId: id },
      }),
      // Delete the page itself
      prisma.legacyPage.delete({
        where: { id: id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting legacy page:", error);
    return NextResponse.json(
      { error: "Error deleting legacy page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the page exists and belongs to the user
    const existingPage = await prisma.legacyPage.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingPage) {
      return NextResponse.json(
        { message: "Legacy page not found or unauthorized" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const pageType = formData.get("pageType") as string;
    const slug = formData.get("slug") as string;
    const honoureeName = formData.get("honoureeName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const dateOfPassing = formData.get("dateOfPassing") as string;
    const creatorName = formData.get("creatorName") as string;
    const relationship = formData.get("relationship") as string;
    const story = formData.get("story") as string;
    const personality = formData.get("personality") as string;
    const values = formData.get("values") as string;
    const beliefs = formData.get("beliefs") as string;
    const coverPhoto = formData.get("coverPhoto") as File;
    const honoureePhoto = formData.get("honoureePhoto") as File;

    // Check if slug is unique (excluding current page)
    if (slug !== existingPage.slug) {
      const existingSlug = await prisma.legacyPage.findFirst({
        where: {
          slug: slug,
          id: { not: params.id },
        },
      });

      if (existingSlug) {
        return NextResponse.json(
          { message: "This page URL is already taken" },
          { status: 400 }
        );
      }
    }

    // Handle file uploads
    let coverPhotoPath = existingPage.coverPhoto;
    let honoureePhotoPath = existingPage.honoureePhoto;

    if (coverPhoto) {
      // Delete old cover photo if it exists
      if (existingPage.coverPhoto) {
        try {
          const oldPath = existingPage.coverPhoto.split("/").pop();
          if (oldPath) {
            await deleteFile("legacy-pages", `cover-photos/${oldPath}`);
          }
        } catch (error) {
          console.error("Error deleting old cover photo:", error);
        }
      }

      const fileName = `${Date.now()}-${coverPhoto.name}`;
      coverPhotoPath = await uploadFile(
        coverPhoto,
        "legacy-pages",
        `cover-photos/${fileName}`
      );
    }

    if (honoureePhoto) {
      // Delete old honouree photo if it exists
      if (existingPage.honoureePhoto) {
        try {
          const oldPath = existingPage.honoureePhoto.split("/").pop();
          if (oldPath) {
            await deleteFile("legacy-pages", `honouree-photos/${oldPath}`);
          }
        } catch (error) {
          console.error("Error deleting old honouree photo:", error);
        }
      }

      const fileName = `${Date.now()}-${honoureePhoto.name}`;
      honoureePhotoPath = await uploadFile(
        honoureePhoto,
        "legacy-pages",
        `honouree-photos/${fileName}`
      );
    }

    // Update legacy page
    await prisma.legacyPage.update({
      where: { id: params.id },
      data: {
        pageType,
        slug,
        honoureeName,
        dateOfBirth: new Date(dateOfBirth),
        dateOfPassing: dateOfPassing ? new Date(dateOfPassing) : null,
        creatorName,
        relationship,
        story,
        coverPhoto: coverPhotoPath,
        honoureePhoto: honoureePhotoPath,
        updatedAt: new Date(),
      },
    });

    // Update general knowledge
    const generalKnowledge = await prisma.generalKnowledge.findFirst({
      where: { legacyPageId: params.id },
    });

    if (generalKnowledge) {
      await prisma.generalKnowledge.update({
        where: { legacyPageId: params.id },
        data: {
          personality,
          values,
          beliefs,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.generalKnowledge.create({
        data: {
          personality,
          values,
          beliefs,
          legacyPageId: params.id,
        },
      });
    }

    // Update media items
    const mediaItems = formData.getAll("mediaItems[0][type]");
    if (mediaItems.length > 0) {
      // Get existing media items to delete their files
      const existingMediaItems = await prisma.mediaItem.findMany({
        where: { legacyPageId: params.id },
      });

      // Delete existing media files
      for (const item of existingMediaItems) {
        try {
          const oldPath = item.url.split("/").pop();
          if (oldPath) {
            await deleteFile("legacy-pages", `media/${oldPath}`);
          }
        } catch (error) {
          console.error("Error deleting old media file:", error);
        }
      }

      // Delete existing media items
      await prisma.mediaItem.deleteMany({
        where: { legacyPageId: params.id },
      });

      // Create new media items
      for (let i = 0; i < mediaItems.length; i++) {
        const type = formData.get(`mediaItems[${i}][type]`) as string;
        const file = formData.get(`mediaItems[${i}][file]`) as File;
        const dateTaken = formData.get(`mediaItems[${i}][dateTaken]`) as string;
        const location = formData.get(`mediaItems[${i}][location]`) as string;
        const description = formData.get(
          `mediaItems[${i}][description]`
        ) as string;

        if (file) {
          const fileName = `${Date.now()}-${file.name}`;
          const url = await uploadFile(
            file,
            "legacy-pages",
            `media/${fileName}`
          );

          await prisma.mediaItem.create({
            data: {
              type,
              url,
              dateTaken: new Date(dateTaken),
              location,
              description,
              legacyPageId: params.id,
            },
          });
        }
      }
    }

    // Update events
    const events = formData.getAll("events[0][name]");
    if (events.length > 0) {
      // Delete existing events
      await prisma.event.deleteMany({
        where: { legacyPageId: params.id },
      });

      // Create new events
      for (let i = 0; i < events.length; i++) {
        const name = formData.get(`events[${i}][name]`) as string;
        const date = formData.get(`events[${i}][date]`) as string;
        const time = formData.get(`events[${i}][time]`) as string;
        const rsvpBy = formData.get(`events[${i}][rsvpBy]`) as string;
        const location = formData.get(`events[${i}][location]`) as string;
        const description = formData.get(`events[${i}][description]`) as string;
        const message = formData.get(`events[${i}][message]`) as string;

        await prisma.event.create({
          data: {
            name,
            date: new Date(date),
            time,
            rsvpBy: rsvpBy ? new Date(rsvpBy) : null,
            location,
            description,
            message,
            legacyPageId: params.id,
          },
        });
      }
    }

    // Update relationships
    const relationships = formData.getAll("relationships[0][type]");
    if (relationships.length > 0) {
      // Delete existing relationships
      await prisma.relationship.deleteMany({
        where: { legacyPageId: params.id },
      });

      // Create new relationships
      for (let i = 0; i < relationships.length; i++) {
        const type = formData.get(`relationships[${i}][type]`) as string;
        const name = formData.get(`relationships[${i}][name]`) as string;

        await prisma.relationship.create({
          data: {
            type,
            name,
            legacyPageId: params.id,
          },
        });
      }
    }

    // Update insights
    const insights = formData.getAll("insights[0][message]");
    if (insights.length > 0) {
      // Delete existing insights
      await prisma.insight.deleteMany({
        where: { legacyPageId: params.id },
      });

      // Create new insights
      for (let i = 0; i < insights.length; i++) {
        const message = formData.get(`insights[${i}][message]`) as string;

        await prisma.insight.create({
          data: {
            message,
            legacyPageId: params.id,
          },
        });
      }
    }

    return NextResponse.json({ id: params.id });
  } catch (error) {
    console.error("Error updating legacy page:", error);
    return NextResponse.json(
      { message: "Error updating legacy page" },
      { status: 500 }
    );
  }
}
