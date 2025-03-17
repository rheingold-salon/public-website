"use client"

import type { ColumnDef } from "@tanstack/react-table"

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
        header: "Date",
    },
    {
        accessorKey: "type",
        header: "Type",
    },

]
