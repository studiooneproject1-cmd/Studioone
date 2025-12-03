"use client";
import { ColumnDef } from "@tanstack/react-table";
import { postData } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const postsColumns: ColumnDef<postData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={image || "/placeholder-logo.png"}
            alt={name}
            width={50}
            height={50}
            className="rounded object-cover"
            unoptimized
          />
          <span>{name}</span>
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const text = row.getValue("name") as string;
      return <div className="text-gray-800 font-medium">{text}</div>;
    },
    enableSorting: true,
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const text = row.getValue("description") as string;
      return (
        <div className="text-gray-700 line-clamp-3 max-w-[300px]">{text}</div>
      );
    },
    enableSorting: true,
  },
];
