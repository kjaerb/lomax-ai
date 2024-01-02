"use client";

import { AIProgress } from "@/components/ai/ai-progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserComment } from "@/schemas/user-comment-schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useSegment } from "@/hooks/use-segment";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useUserResponseStore from "@/stores/user-reponse-store";
import { Messages } from "@/components/ai/messages";
import { useUserId } from "@/hooks/use-user";

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
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const index = row.index;
      const { setShouldSegment } = useUserResponseStore();
      const isSelected = row.getIsSelected();

      useEffect(() => {
        setShouldSegment(index, isSelected);
      }, [index, isSelected, setShouldSegment]);

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyAccountNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {headerTranslations["companyAccountNumber"]}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {headerTranslations["companyName"]}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {headerTranslations["rating"]}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
      const { getUserResponse, setProgress } = useUserResponseStore();
      const state = getUserResponse(index);

      if (!state) return <></>;

      const { progress, messages } = state.segment;

      const [messageObjState, setMessageObjState] = useState<any>(null);

      useEffect(() => {
        try {
          if (progress !== "finished") return;

          const messageObj = JSON.parse(messages[messages.length - 1].content);
          setMessageObjState(messageObj);
        } catch (e) {
          console.error(e);
          setProgress(index, "error");
        }
      }, [progress, setProgress, setMessageObjState, index, messages]);

      return (
        <div className="space-y-2">
          {messageObjState ? (
            Object.keys(messageObjState).map((key, index) => (
              <div
                key={index}
                className={cn(
                  index === 0 && "text-green-500",
                  index === 1 && "text-red-500"
                )}
              >
                <span className="font-bold">{key}:</span> {messageObjState[key]}
              </div>
            ))
          ) : (
            <Messages messages={messages} showInitialMessage={false} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "aiProcess",
    header: "Process",
    cell: ({ row }) => {
      const index = row.index;
      const { getUserResponse } = useUserResponseStore();
      const state = getUserResponse(index);

      if (!state) return null;

      return (
        <AIProgress
          progress={state.segment.progress}
          className="flex justify-center items-center"
        />
      );
    },
  },
  {
    accessorKey: "startProcess",
    header: "Manual",
    cell: ({ row }) => {
      const userId = useUserId();

      if (!userId) return null;

      const { userComment, rating, companyAccountNumber, companyName } =
        row.original;
      const index = row.index;
      const buttonRef = useRef<HTMLButtonElement>(null);
      const parsedRating = parseInt(rating.toString(), 10);

      const { setSegmentTrigger, setProgress, setMessages } =
        useUserResponseStore();

      const { messages, error, handleSubmit, isLoading } = useSegment({
        userSegment: {
          comment: userComment,
          rating: parsedRating,
          companyAccountName: companyName,
          companyAccountNumber: companyAccountNumber.toString(),
          userId: userId,
        },
      });

      useEffect(() => {
        if (!buttonRef.current) return;
        setSegmentTrigger(index, buttonRef);
      }, [index, setSegmentTrigger]);

      useEffect(() => {
        if (messages.length < 1) return;

        if (isLoading) {
          setProgress(index, "loading");
          setMessages(index, messages);
          return;
        }

        if (error) {
          setProgress(index, "error");
          setMessages(index, messages);
          return;
        }

        setProgress(index, "finished");
        setMessages(index, messages);
      }, [messages, error, isLoading, setProgress, setMessages, index]);

      return (
        <form onSubmit={handleSubmit}>
          <Button disabled={isLoading} ref={buttonRef}>
            Start
          </Button>
        </form>
      );
    },
  },
];
