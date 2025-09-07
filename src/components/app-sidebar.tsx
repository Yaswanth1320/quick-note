import * as React from "react";
import { NotebookPen } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/actions/notebooks";
import Link from "next/link";
import { SidebarData } from "./sidebar-data";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-1 mt-2 flex flex-col items-center justify-center text-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold text-primary hover:scale-105 transition-transform"
        >
          <NotebookPen className="h-6 w-6" />
          <span>QuickNotes</span>
        </Link>
        <p className="text-xs text-muted-foreground">Organize your thoughts</p>
        <div className="mt-2 w-full">
          <SearchForm />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 p-1">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
