"use client";

import { Card } from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2, CalendarDays, StickyNote } from "lucide-react";
import { deleteNotebook } from "@/actions/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNotebook(notebook.id);
      if (response.success) {
        toast.success("Notebook deleted successfully");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete notebook");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const createdAt = new Date(notebook?.createdAt ?? "").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
      <Card className="w-full border border-muted hover:border-primary/70 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl p-4">
        {/* Top row: name + notes (left) and buttons (right) */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-foreground mb-1">
              {notebook?.name}
            </h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <StickyNote className="size-4 text-primary shrink-0" />
              <span className="truncate">
                {notebook?.notes?.length ?? 0} notes
              </span>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Link href={`/dashboard/notebook/${notebook?.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the notebook and all its notes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Bottom row: created date */}
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3 text-primary shrink-0" />
          <span className="truncate">Created {createdAt}</span>
        </div>
      </Card>
    </motion.div>
  );
}
