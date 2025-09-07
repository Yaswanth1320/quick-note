// app/actions/testimonials.ts
"use server";

import { testimonials } from "@/db/schema";
import { z } from "zod";
import { db } from "..";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

const TestimonialSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  role: z.string().min(1),
});

export async function addTestimonial(input: {
  title: string;
  content: string;
  role: string;
}) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return {
        success: false,
        message: "You must be signed in to add a testimonial.",
      };
    }

    const parsed = TestimonialSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, message: "Invalid testimonial data." };
    }

    const [inserted] = await db
      .insert(testimonials)
      .values({
        title: parsed.data.title,
        content: parsed.data.content,
        authorName: session.user.name ?? "Anonymous",
        authorRole: parsed.data.role,
        authorImage: session.user.image ?? "",
        userId: session.user.id,
      })
      .returning();

    return {
      success: true,
      message: "Testimonial added successfully!",
      data: inserted,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function getAllTestimonials() {
  try {
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));

    return { success: true, data: rows };
  } catch {
    return { success: false, message: "Failed to fetch testimonials." };
  }
}

export async function getUserTestimonials() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return {
        success: false,
        message: "Please log in to see your testimonials.",
      };
    }

    const rows = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.userId, session.user.id))
      .orderBy(desc(testimonials.createdAt));

    return { success: true, data: rows };
  } catch {
    return { success: false, message: "Could not load your testimonials." };
  }
}
