"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
    id: number,
    titleDe: string,
    titleEn: string,
    contentDe: string,
    contentEn: string,
    location: string,
    date: string,
    time: string,
    type: "event" | "vortrag" | "podcast" | "tv"
    imagePath: string,
    externalLink: string,
    highlight: boolean,
}

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
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const event = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        className="h-8 w-8 p-0"
                        aria-label="Edit"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 p-0" //text-red-500 hover:text-read-600
                        aria-label="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        }
    },

]
