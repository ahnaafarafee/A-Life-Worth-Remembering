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

  const page = await prisma.legacyPage.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  if (!page) {
    redirect("/");
  }

  return <EditLegacyPage id={params.id} />;
}
