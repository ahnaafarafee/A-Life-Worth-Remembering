import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const page = await prisma.legacyPage.findFirst({
      where: { userId: user.id },
      include: {
        generalKnowledge: true,
        mediaItems: true,
        events: true,
        relationships: true,
        insights: true,
      },
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error checking legacy page:", error);
    return NextResponse.json(
      { error: "Error checking legacy page" },
      { status: 500 }
    );
  }
}
