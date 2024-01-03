"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

import { ColumnDef } from "@tanstack/react-table";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type UserResponseTable = ArrayElement<
  Awaited<ReturnType<typeof api.aiSegmentation.getAISegmentations.query>>
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
    accessorKey: "userRating",
    header: "Rating",
  },
  {
    accessorKey: "userComment",
    header: "Bruger kommentar",
  },
  {
    accessorKey: "positiveComment",
    header: "Positiv kommentarer",
    cell: ({ row }) => {
      const { positiveComment } = row.original;

      return (
        <div className="space-y-2">
          {positiveComment.length > 0 ? (
            positiveComment.map((comment, i) => (
              <span key={`${comment}:${i}`} className={cn("block")}>
                {comment}
              </span>
            ))
          ) : (
            <span className={cn("block")}>Ingen kommentarer</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "negativeComment",
    header: "Negativ kommentarer",
    cell: ({ row }) => {
      const { negativeComment } = row.original;

      return (
        <div className="space-y-2">
          {negativeComment.length > 0 ? (
            negativeComment.map((comment, i) => (
              <span key={`${comment}:${i}`} className={cn("block")}>
                {comment}
              </span>
            ))
          ) : (
            <span className={cn("block")}>Ingen kommentarer</span>
          )}
        </div>
      );
    },
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
];
