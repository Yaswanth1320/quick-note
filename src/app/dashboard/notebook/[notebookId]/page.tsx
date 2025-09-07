import { getNotebookById } from "@/actions/notebooks";
import { CreateNoteButton } from "@/components/createNoteButton";
import NoteCard from "@/components/NoteCard";
import { PageWrapper } from "@/components/Wrapper";
import { NotebookText } from "lucide-react";
import { Suspense } from "react";

// Skeleton loader for notes
function NotesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-xl border border-border bg-card p-4 shadow-sm animate-pulse flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-muted" />
            <div className="h-3 w-1/2 rounded-md bg-muted" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <div className="h-8 w-16 rounded-md bg-muted" />
            <div className="h-8 w-8 rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Async component for rendering notes
async function NotesGrid({ notebookId }: { notebookId: string }) {
  const res = await getNotebookById(notebookId);
  const notebook = res?.notebook;

  if (!notebook) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-destructive">
        <NotebookText className="h-10 w-10 mb-2" />
        <p>Failed to load notebook. Please try again later.</p>
      </div>
    );
  }

  if (!notebook.notes?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <NotebookText className="h-10 w-10 mb-2 text-primary/60" />
        <p>No notes found</p>
        <p className="text-sm">Create your first note to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notebook.notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

type Params = {
  notebookId: string;
};

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = params;
  const { notebook } = await getNotebookById(notebookId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookId}`,
        },
      ]}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-1 text-2xl font-bold text-foreground">
          <NotebookText className="h-5 w-5 text-primary" />
          {notebook?.name ?? "Notebook"}
        </h1>
        <CreateNoteButton notebookId={notebookId} />
      </div>

      <Suspense fallback={<NotesSkeleton />}>
        <NotesGrid notebookId={notebookId} />
      </Suspense>
    </PageWrapper>
  );
}
