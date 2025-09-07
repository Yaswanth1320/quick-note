"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/db/schema";
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
import { Loader2, Trash2,NotebookPen, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNote } from "@/actions/notes";
import { motion } from "framer-motion";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNote(note.id);

      if (response.success) {
        toast.success("Note deleted successfully");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const createdAt =
    note.createdAt &&
    new Date(note.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
      <Card className="w-full border border-muted hover:border-primary/70 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl p-4 flex flex-col justify-between">
        {/* Top: Title & buttons */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <NotebookPen className="h-4 w-4 text-primary shrink-0" />
            <CardTitle className="truncate text-sm font-semibold text-foreground">
              {note.title}
            </CardTitle>
          </div>

          <div className="flex gap-1">
            <Link
              href={`/dashboard/notebook/${note.notebookId}/note/${note.id}`}
            >
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting}
                  className="flex items-center justify-center"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the note.
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

        {/* Bottom: Created date */}
        {createdAt && (
          <CardContent className="pt-2 px-0">
            <p className="flex items-center gap-1 text-xs text-muted-foreground truncate">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {createdAt}
            </p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
