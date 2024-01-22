"use client";

import { api } from "@/trpc/server";
import { ColumnDef } from "@tanstack/react-table";
import { ID } from "@/components/tables/columns/id";
import { NPSComments } from "@/components/tables/columns/nps-comments";
import { UserID } from "@/components/tables/columns/user-id";
import { Date } from "@/components/tables/columns/date";
import { HistoryActionsColumn } from "@/components/tables/history-table/columns/actions/";
import { SortableColumn } from "../columns/company-account-number";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type UserResponseTableColumns = ArrayElement<
  Awaited<ReturnType<typeof api.npsAiSegmentation.getAISegmentations.query>>
>;

export const columns: ColumnDef<UserResponseTableColumns>[] = [
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
    header: ({ column }) => {
      return <SortableColumn column={column}>Company Number</SortableColumn>;
    },
  },
  {
    accessorKey: "companyAccountName",
    header: ({ column }) => {
      return <SortableColumn column={column}>Company Name</SortableColumn>;
    },
  },
  {
    accessorKey: "userRating",
    header: ({ column }) => {
      return <SortableColumn column={column}>Rating</SortableColumn>;
    },
  },
  {
    accessorKey: "userComment",
    header: "Bruger kommentar",
  },
  {
    accessorKey: "surveySendTime",
    header: ({ column }) => {
      return <SortableColumn column={column}>Survey Send Time</SortableColumn>;
    },
    cell: ({ row }) => {
      const { surveySendTime } = row.original;

      return <Date date={surveySendTime} />;
    },
  },
  {
    accessorKey: "positiveComment",
    header: "Positive kommentarer",
    cell: ({ row }) => {
      const { positiveComments } = row.original;

      return <NPSComments comments={positiveComments} />;
    },
  },
  {
    accessorKey: "negativeComment",
    header: "Negative kommentarer",
    cell: ({ row }) => {
      const { negativeComments } = row.original;

      return <NPSComments comments={negativeComments} />;
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
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <HistoryActionsColumn row={row.original} />;
    },
  },
];
