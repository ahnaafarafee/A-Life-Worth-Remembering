import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";

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

    // Get the page to check ownership and get cover photo URL
    const page = await prisma.legacyPage.findUnique({
      where: { id: id },
      include: {
        mediaItems: true,
        events: true,
        relationships: true,
        insights: true,
        generalKnowledge: true,
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

    // Delete the cover photo if it exists
    if (page.coverPhoto) {
      const photoPath = join(process.cwd(), "public", page.coverPhoto);
      try {
        await unlink(photoPath);
      } catch (error) {
        console.error("Error deleting cover photo:", error);
      }
    }

    // Delete the honouree photo if it exists
    if (page.honoureePhoto) {
      const photoPath = join(process.cwd(), "public", page.honoureePhoto);
      try {
        await unlink(photoPath);
      } catch (error) {
        console.error("Error deleting honouree photo:", error);
      }
    }

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
    const existingPage = await prisma.$queryRaw<LegacyPage[]>`
      SELECT * FROM LegacyPage WHERE id = ${params.id} AND userId = ${user.id} LIMIT 1
    `;

    if (!existingPage || existingPage.length === 0) {
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
    if (slug !== existingPage[0].slug) {
      const existingSlug = await prisma.$queryRaw<LegacyPage[]>`
        SELECT * FROM LegacyPage WHERE slug = ${slug} AND id != ${params.id} LIMIT 1
      `;

      if (existingSlug && existingSlug.length > 0) {
        return NextResponse.json(
          { message: "This page URL is already taken" },
          { status: 400 }
        );
      }
    }

    // Handle file uploads
    let coverPhotoPath = existingPage[0].coverPhoto;
    let honoureePhotoPath = existingPage[0].honoureePhoto;

    if (coverPhoto) {
      // Delete old cover photo if it exists
      if (existingPage[0].coverPhoto) {
        try {
          await unlink(
            join(process.cwd(), "public", existingPage[0].coverPhoto)
          );
        } catch (error) {
          console.error("Error deleting old cover photo:", error);
        }
      }

      const bytes = await coverPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${coverPhoto.name}`;
      const path = join(process.cwd(), "public", "uploads", fileName);
      await writeFile(path, buffer);
      coverPhotoPath = `/uploads/${fileName}`;
    }

    if (honoureePhoto) {
      // Delete old honouree photo if it exists
      if (existingPage[0].honoureePhoto) {
        try {
          await unlink(
            join(process.cwd(), "public", existingPage[0].honoureePhoto)
          );
        } catch (error) {
          console.error("Error deleting old honouree photo:", error);
        }
      }

      const bytes = await honoureePhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${honoureePhoto.name}`;
      const path = join(process.cwd(), "public", "uploads", fileName);
      await writeFile(path, buffer);
      honoureePhotoPath = `/uploads/${fileName}`;
    }

    // Update legacy page
    await prisma.$queryRaw`
      UPDATE LegacyPage
      SET
        pageType = ${pageType},
        slug = ${slug},
        honoureeName = ${honoureeName},
        dateOfBirth = ${new Date(dateOfBirth)},
        dateOfPassing = ${dateOfPassing ? new Date(dateOfPassing) : null},
        creatorName = ${creatorName},
        relationship = ${relationship},
        story = ${story},
        coverPhoto = ${coverPhotoPath},
        honoureePhoto = ${honoureePhotoPath},
        updatedAt = NOW()
      WHERE id = ${params.id}
    `;

    // Update general knowledge
    const generalKnowledge = await prisma.$queryRaw<GeneralKnowledge[]>`
      SELECT * FROM GeneralKnowledge WHERE legacyPageId = ${params.id} LIMIT 1
    `;

    if (generalKnowledge && generalKnowledge.length > 0) {
      await prisma.$queryRaw`
        UPDATE GeneralKnowledge
        SET
          personality = ${personality},
          \`values\` = ${values},
          beliefs = ${beliefs},
          updatedAt = NOW()
        WHERE legacyPageId = ${params.id}
      `;
    } else {
      await prisma.$queryRaw`
        INSERT INTO GeneralKnowledge (
          id, personality, \`values\`, beliefs, legacyPageId, createdAt, updatedAt
        ) VALUES (
          UUID(), ${personality}, ${values}, ${beliefs}, ${params.id}, NOW(), NOW()
        )
      `;
    }

    // Update media items
    const mediaItems = formData.getAll("mediaItems[0][type]");
    if (mediaItems.length > 0) {
      // Delete existing media items
      await prisma.$queryRaw`
        DELETE FROM MediaItem WHERE legacyPageId = ${params.id}
      `;

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
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `${Date.now()}-${file.name}`;
          const path = join(process.cwd(), "public", "uploads", fileName);
          await writeFile(path, buffer);
          const url = `/uploads/${fileName}`;

          await prisma.$queryRaw`
            INSERT INTO MediaItem (
              id, type, url, dateTaken, location, description,
              legacyPageId, createdAt, updatedAt
            ) VALUES (
              UUID(), ${type}, ${url}, ${new Date(dateTaken)}, ${location},
              ${description}, ${params.id}, NOW(), NOW()
            )
          `;
        }
      }
    }

    // Update events
    const events = formData.getAll("events[0][name]");
    if (events.length > 0) {
      // Delete existing events
      await prisma.$queryRaw`
        DELETE FROM Event WHERE legacyPageId = ${params.id}
      `;

      // Create new events
      for (let i = 0; i < events.length; i++) {
        const name = formData.get(`events[${i}][name]`) as string;
        const date = formData.get(`events[${i}][date]`) as string;
        const time = formData.get(`events[${i}][time]`) as string;
        const rsvpBy = formData.get(`events[${i}][rsvpBy]`) as string;
        const location = formData.get(`events[${i}][location]`) as string;
        const description = formData.get(`events[${i}][description]`) as string;
        const message = formData.get(`events[${i}][message]`) as string;

        await prisma.$queryRaw`
          INSERT INTO Event (
            id, name, date, time, rsvpBy, location, description,
            message, legacyPageId, createdAt, updatedAt
          ) VALUES (
            UUID(), ${name}, ${new Date(date)}, ${time},
            ${rsvpBy ? new Date(rsvpBy) : null}, ${location},
            ${description}, ${message}, ${params.id}, NOW(), NOW()
          )
        `;
      }
    }

    // Update relationships
    const relationships = formData.getAll("relationships[0][type]");
    if (relationships.length > 0) {
      // Delete existing relationships
      await prisma.$queryRaw`
        DELETE FROM Relationship WHERE legacyPageId = ${params.id}
      `;

      // Create new relationships
      for (let i = 0; i < relationships.length; i++) {
        const type = formData.get(`relationships[${i}][type]`) as string;
        const name = formData.get(`relationships[${i}][name]`) as string;

        await prisma.$queryRaw`
          INSERT INTO Relationship (
            id, type, name, legacyPageId, createdAt, updatedAt
          ) VALUES (
            UUID(), ${type}, ${name}, ${params.id}, NOW(), NOW()
          )
        `;
      }
    }

    // Update insights
    const insights = formData.getAll("insights[0][message]");
    if (insights.length > 0) {
      // Delete existing insights
      await prisma.$queryRaw`
        DELETE FROM Insight WHERE legacyPageId = ${params.id}
      `;

      // Create new insights
      for (let i = 0; i < insights.length; i++) {
        const message = formData.get(`insights[${i}][message]`) as string;

        await prisma.$queryRaw`
          INSERT INTO Insight (
            id, message, legacyPageId, createdAt, updatedAt
          ) VALUES (
            UUID(), ${message}, ${params.id}, NOW(), NOW()
          )
        `;
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
