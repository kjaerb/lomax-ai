"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

import { ColumnDef } from "@tanstack/react-table";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type UserResponseTable = ArrayElement<
  Awaited<ReturnType<typeof api.userResponses.getUserRespones.query>>
>;

export const columns: ColumnDef<UserResponseTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { id } = row.original;

      return <span>{id}</span>;
    },
  },
  {
    accessorKey: "companyAccountNumber",
    header: "Company Account Number",
  },
  {
    accessorKey: "companyAccountName",
    header: "Company Account Name",
  },
  {
    accessorKey: "userId",
    header: "Bruger",
    cell: ({ row }) => {
      const { user } = row.original;
      if (!user) return <span>Ukendt bruger</span>;

      if (!user.name) return <span>{user.email}</span>;

      return <span>{user.name}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Oprettet",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return <span>{createdAt.toDateString()}</span>;
    },
  },
  {
    accessorKey: "comment",
    header: "Kommentar",
    cell: ({ row }) => {
      const { comment } = row.original;

      const commentObj = JSON.parse(comment);

      return Object.keys(commentObj).map((key, index) => (
        <div
          key={index}
          className={cn(
            index === 0 && "text-green-500",
            index === 1 && "text-red-500"
          )}
        >
          <span className="font-bold">{key}:</span> {commentObj[key]}
        </div>
      ));
    },
  },
];
