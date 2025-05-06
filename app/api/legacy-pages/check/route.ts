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

    const page = await prisma.$queryRaw`
      SELECT * FROM LegacyPage WHERE userId = ${user.id} LIMIT 1
    `;

    return NextResponse.json({
      page: Array.isArray(page) && page.length > 0 ? page[0] : null,
    });
  } catch (error) {
    console.error("Error checking legacy page:", error);
    return NextResponse.json(
      { error: "Error checking legacy page" },
      { status: 500 }
    );
  }
}
