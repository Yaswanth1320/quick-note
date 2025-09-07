import { getNotebooks } from "@/actions/notebooks";
import CreateNotebookButton from "@/components/createNotebookButton";
import NotebookCard from "@/components/NoteBookCard";
import { PageWrapper } from "@/components/Wrapper";
import { Notebook as NotebookIcon } from "lucide-react";
import { Suspense } from "react";

// ✅ Notebook grid wrapped in async component
async function NotebooksGrid() {
  const notebooks = await getNotebooks();

  if (!notebooks.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-destructive">
        <NotebookIcon className="h-10 w-10 mb-2" />
        <p>Failed to load notebooks. Please try again later.</p>
      </div>
    );
  }

  if (notebooks?.notebooks?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <NotebookIcon className="h-10 w-10 mb-2 text-primary/60" />
        <p>No notebooks found</p>
        <p className="text-sm">Create your first notebook to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notebooks?.notebooks?.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
}

// ✅ Skeleton loader while fetching
function NotebooksSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-xl border border-border bg-card p-4 shadow-sm animate-pulse flex flex-col justify-between"
        >
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-muted" />
            <div className="h-3 w-1/2 rounded-md bg-muted" />
          </div>

          {/* Footer (buttons area) */}
          <div className="flex justify-end gap-2 mt-4">
            <div className="h-8 w-16 rounded-md bg-muted" />
            <div className="h-8 w-8 rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <NotebookIcon className="h-6 w-6 text-primary" />
          Notebooks
        </h1>
        <CreateNotebookButton />
      </div>

      {/* ✅ Suspense handles loading */}
      <Suspense fallback={<NotebooksSkeleton />}>
        <NotebooksGrid />
      </Suspense>
    </PageWrapper>
  );
}
