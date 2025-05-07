import { auth } from "@clerk/nextjs/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

interface LegacyPage {
  id: string;
}

interface User {
  id: string;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if user already has a legacy page
    const existingPage = await prisma.legacyPage.findFirst({
      where: { userId: user.id },
    });

    if (existingPage) {
      return NextResponse.json(
        { message: "User already has a legacy page" },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingSlug = await prisma.legacyPage.findFirst({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { message: "This page URL is already taken" },
        { status: 400 }
      );
    }

    // Handle file uploads
    let coverPhotoPath = null;
    let honoureePhotoPath = null;

    if (coverPhoto) {
      const bytes = await coverPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${coverPhoto.name}`;
      const path = join(process.cwd(), "public", "uploads", fileName);
      await writeFile(path, buffer);
      coverPhotoPath = `/uploads/${fileName}`;
    }

    if (honoureePhoto) {
      const bytes = await honoureePhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${honoureePhoto.name}`;
      const path = join(process.cwd(), "public", "uploads", fileName);
      await writeFile(path, buffer);
      honoureePhotoPath = `/uploads/${fileName}`;
    }

    // Create legacy page with related records
    const createdPage = await prisma.legacyPage.create({
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
        userId: user.id,
      },
    });

    const pageId = createdPage.id;

    // Create general knowledge
    if (personality || values || beliefs) {
      await prisma.generalKnowledge.create({
        data: {
          personality,
          values,
          beliefs,
          legacyPageId: pageId,
        },
      });
    }

    // Create media items
    const mediaItems = formData.getAll("mediaItems[0][type]");
    for (let i = 0; i < mediaItems.length; i++) {
      const type = formData.get(`mediaItems[${i}][type]`) as string;
      const file = formData.get(`mediaItems[${i}][file]`) as File;
      const dateTaken = formData.get(`mediaItems[${i}][dateTaken]`) as string;
      const location = formData.get(`mediaItems[${i}][location]`) as string;
      const description = formData.get(
        `mediaItems[${i}][description]`
      ) as string;

      // Handle media file upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const path = join(process.cwd(), "public", "uploads", fileName);
      await writeFile(path, buffer);
      const url = `/uploads/${fileName}`;

      await prisma.mediaItem.create({
        data: {
          type,
          url,
          dateTaken: new Date(dateTaken),
          location,
          description,
          legacyPageId: pageId,
        },
      });
    }

    // Create events
    const events = formData.getAll("events[0][name]");
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
          legacyPageId: pageId,
        },
      });
    }

    // Create relationships
    const relationships = formData.getAll("relationships[0][type]");
    for (let i = 0; i < relationships.length; i++) {
      const type = formData.get(`relationships[${i}][type]`) as string;
      const name = formData.get(`relationships[${i}][name]`) as string;

      await prisma.relationship.create({
        data: {
          type,
          name,
          legacyPageId: pageId,
        },
      });
    }

    // Create insights
    const insights = formData.getAll("insights[0][message]");
    for (let i = 0; i < insights.length; i++) {
      const message = formData.get(`insights[${i}][message]`) as string;

      await prisma.insight.create({
        data: {
          message,
          legacyPageId: pageId,
        },
      });
    }

    return NextResponse.json({ id: pageId });
  } catch (error) {
    console.error("Error creating legacy page:", error);
    return NextResponse.json(
      { message: "Error creating legacy page" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const page = await prisma.legacyPage.findFirst({
      where: { userId: user.id },
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error checking legacy page:", error);
    return NextResponse.json(
      { message: "Error checking legacy page" },
      { status: 500 }
    );
  }
}
