import { UserComment } from "@/schemas/user-comment-schema";
import { ColumnDef } from "@tanstack/react-table";
import { CheckboxRowHeader } from "@/components/tables/columns/checkbox-header";
import { UserRatingCheckboxRow } from "./columns/user-rating-checkbox-row";
import { SortableColumn } from "@/components/tables/columns/company-account-number";
import { Comments } from "./columns/comments";
import { AIProcess } from "./columns/ai-process";
import { ManualStartProcess } from "./columns/start-process";

export const headerTranslations: Record<keyof UserComment, string> = {
  companyAccountNumber: "Account Number",
  companyName: "Name",
  rating: "Rating",
  userComment: "User Comment",
  surveySendTime: "Survey Send Time",
  weekYear: "Week / Year",
};

export const columns: ColumnDef<UserComment>[] = [
  {
    id: "select",
    header: ({ table }) => <CheckboxRowHeader table={table} />,
    cell: ({ row }) => {
      const index = row.index;

      return <UserRatingCheckboxRow index={index} row={row} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyAccountNumber",
    header: ({ column }) => {
      return (
        <SortableColumn column={column}>
          {headerTranslations["companyAccountNumber"]}
        </SortableColumn>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <SortableColumn column={column}>
          {headerTranslations["companyName"]}
        </SortableColumn>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <SortableColumn column={column}>
          {headerTranslations["rating"]}
        </SortableColumn>
      );
    },
  },
  {
    accessorKey: "userComment",
    header: headerTranslations["userComment"],
  },
  {
    accessorKey: "surveySendTime",
    header: headerTranslations["surveySendTime"],
  },
  {
    accessorKey: "weekYear",
    header: headerTranslations["weekYear"],
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      const index = row.index;

      return <Comments index={index} />;
    },
  },
  {
    accessorKey: "aiProcess",
    header: ({ column }) => {
      return <SortableColumn column={column}>Process</SortableColumn>;
    },
    cell: ({ row }) => {
      const index = row.index;

      return <AIProcess index={index} />;
    },
  },
  {
    accessorKey: "startProcess",
    header: "Manual",
    cell: ({ row }) => <ManualStartProcess row={row} />,
  },
];
