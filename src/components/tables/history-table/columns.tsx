"use client";

import { trpc } from "@/providers/trpc-provider";
import { UserReponse } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserReponse>[] = [
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
    header: "User ID",
    cell: async ({ row }) => {
      const { userId } = row.original;

      const m = trpc.userResponses.getNumResponses.useQuery(10);

      return <span>{userId}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return <span>{createdAt.toDateString()}</span>;
    },
  },
];
