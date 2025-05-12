import prisma from "@/prisma/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, image_url } = evt.data;
      try {
        const newUser = await prisma.user.create({
          data: {
            clerkUserId: id,
            email: email_addresses[0].email_address,
            name: first_name || email_addresses[0].email_address.split("@")[0],
          },
        });
        return new Response(JSON.stringify(newUser), { status: 201 });
      } catch (err) {
        console.error("Error creating user:", err);
      }
    }

    if (evt.type === "user.updated") {
      const { id, email_addresses, first_name } = evt.data;
      try {
        const updatedUser = await prisma.user.update({
          where: { clerkUserId: id },
          data: {
            email: email_addresses[0].email_address,
            name: first_name || email_addresses[0].email_address.split("@")[0],
          },
        });
        return new Response(JSON.stringify(updatedUser), { status: 200 });
      } catch (err) {
        console.error("Error updating user:", err);
      }
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      try {
        await prisma.user.delete({
          where: { clerkUserId: id },
        });
        return new Response("User deleted", { status: 200 });
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
