import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import EditLegacyPage from "./EditLegacyPage";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const page = await prisma.$queryRaw`
    SELECT * FROM LegacyPage WHERE id = ${params.id} AND userId = ${user.id} LIMIT 1
  `;

  if (!page || page.length === 0) {
    redirect("/");
  }

  return <EditLegacyPage id={params.id} />;
}
