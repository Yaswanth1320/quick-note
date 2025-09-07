import { getNoteById } from "@/actions/notes";
import RichTextEditor from "@/components/TextEditor";
import React from "react";
import { JSONContent } from "@tiptap/react";
import { PageWrapper } from "@/components/Wrapper";

type Params = Promise<{ noteId: string }>;

const NotePage = async ({ params }: { params: Params }) => {
  const { noteId } = await params;
  const { note } = await getNoteById(noteId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`,
        },
        { label: note?.title ?? "Note", href: `/dashboard/note/${noteId}` },
      ]}
    >
      <div className="w-full h-[90vh] p-2 flex justify-center bg-background">
        <div className="w-full max-w-6xl h-full rounded-xl flex flex-col border border-border bg-card shadow-md overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
            <h1 className="text-xl font-semibold text-foreground">
              {note?.title || "Untitled Note"}
            </h1>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-y-auto p-6">
            <RichTextEditor
              content={note?.content as JSONContent[]}
              noteId={noteId}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotePage;
