"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/delete-dialog";
import { ArrowUpDown } from "lucide-react";
import { DataForm } from "./event-form";
import { type Event } from "@/lib/zod";

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titleDe",
    header: "Title (German)",
  },
  {
    accessorKey: "titleEn",
    header: "Title (English)",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <div className="flex items-center gap-2">
          <DataForm mode="update" id={event.id} initialData={event} />
          <DeleteDialog itemId={event.id} />
        </div>
      );
    },
  },
];
