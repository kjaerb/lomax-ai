"use client";

import { api } from "@/trpc/server";
import { ColumnDef } from "@tanstack/react-table";
import { ID } from "@/components/tables/columns/id";
import { Comments } from "@/components/tables/columns/comments";
import { UserID } from "@/components/tables/columns/user-id";
import { Date } from "@/components/tables/columns/date";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type UserResponseTable = ArrayElement<
  Awaited<ReturnType<typeof api.npsAiSegmentation.getAISegmentations.query>>
>;

export const columns: ColumnDef<UserResponseTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { id } = row.original;

      return <ID id={id} />;
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
    accessorKey: "surveySendTime",
    header: "Survey Send Time",
    cell: ({ row }) => {
      const { surveySendTime } = row.original;

      return <Date date={surveySendTime} />;
    },
  },
  {
    accessorKey: "positiveComment",
    header: "Positiv kommentarer",
    cell: ({ row }) => {
      const { positiveComments } = row.original;

      return <Comments comments={positiveComments} />;
    },
  },
  {
    accessorKey: "negativeComment",
    header: "Negativ kommentarer",
    cell: ({ row }) => {
      const { negativeComments } = row.original;

      return <Comments comments={negativeComments} />;
    },
  },
  {
    accessorKey: "userId",
    header: "Bruger",
    cell: ({ row }) => {
      const { user } = row.original;

      return <UserID user={user} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Oprettet",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return <Date date={createdAt} />;
    },
  },
];
