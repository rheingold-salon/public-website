"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Person = {
  id: number;
  name: string;
  roleDe: string;
  roleEn: string;
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "roleDe",
    header: "Role (German)",
  },
  {
    accessorKey: "roleEn",
    header: "Role (English)",
  },
];
