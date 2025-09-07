"use server";

import { InsertNotebook, notebooks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { db } from "..";
import { eq } from "drizzle-orm";

export const createNotebook = async (values: InsertNotebook) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "User not found" };
    }

    await db.insert(notebooks).values(values).returning();
    return { success: true, message: "Notebook created successfully" };
  } catch {
    return { success: false, message: "Failed to create notebook" };
  }
};

export const getNotebooks = async () => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: {
        notes: true,
      },
    });

    return { success: true, notebooks: notebooksByUser };
  } catch {
    return { success: false, message: "Failed to get notebooks" };
  }
};

export const getNotebookById = async (id: string) => {
  try {
    const notebook = await db.query.notebooks.findFirst({
      where: eq(notebooks.id, id),
      with: {
        notes: true,
      },
    });

    return { success: true, notebook };
  } catch {
    return { success: false, message: "Failed to get notebook" };
  }
};

export const updateNotebook = async (id: string, values: InsertNotebook) => {
  try {
    await db.update(notebooks).set(values).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook updated successfully" };
  } catch {
    return { success: false, message: "Failed to update notebook" };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook deleted successfully" };
  } catch {
    return { success: false, message: "Failed to delete notebook" };
  }
};
