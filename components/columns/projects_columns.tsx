"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectData } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const projectsColumns: ColumnDef<ProjectData>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Title
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="text-gray-800 font-medium">{title}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Category
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const category = row.getValue("category_name") as string;
      return <div className="text-gray-600">{category}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const title = row.getValue("title") as string;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={image || "/placeholder-project.png"}
            alt={title}
            width={50}
            height={50}
            className="rounded-md object-cover"
            unoptimized
          />
          <span>{title}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "is_recent",
    header: "Recent",
    cell: ({ row }) => {
      const isRecent = row.getValue("is_recent") as boolean;
      return (
        <span className={`px-2 py-1 rounded text-white ${isRecent ? "bg-green-600" : "bg-gray-400"}`}>
          {isRecent ? "Yes" : "No"}
        </span>
      );
    },
    enableSorting: true,
  },
];
