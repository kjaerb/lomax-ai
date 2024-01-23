"use client";

import { CommentsSkeleton } from "@/components/skeletons/comments-skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { apiClient } from "@/providers/trpc-provider";
import { NPSSegment as NPSSegmentType, SEGMENT_TYPE } from "@prisma/client";
import { useState } from "react";

const npsSegmentVariant: Record<keyof typeof SEGMENT_TYPE, string> = {
  NEGATIVE: "text-red-500",
  POSITIVE: "text-emerald-500",
  NEUTRAL: "text-gray-500",
};

interface NPSSegmentProps {
  comment: NPSSegmentType;
}

export function NPSSegment({ comment }: NPSSegmentProps) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { data: npsSegments } =
    apiClient.npsSegment.getNPSSegmentByName.useQuery(
      {
        name: comment.name,
      },
      {
        enabled: shouldFetch,
      }
    );
  const { data: npsGroup } =
    apiClient.npsSegment.getSegmentGroupCountByName.useQuery(
      {
        name: comment.name,
      },
      {
        enabled: shouldFetch,
      }
    );

  return (
    <Dialog onOpenChange={() => setShouldFetch(!shouldFetch)}>
      <DialogTrigger className="text-left">
        <p
          className={cn(
            npsSegmentVariant[comment.type],
            "transition-all duration-200 rounded-md px-2 py-1"
          )}
        >
          {comment.name}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{comment.name}</DialogTitle>
          <DialogDescription>
            {npsGroup && (
              <span>Denne grupering er brugt {npsGroup.count} gange</span>
            )}
          </DialogDescription>
        </DialogHeader>
        {npsSegments ? (
          <div className="space-y-2">
            {npsSegments.map((segment) => (
              <div key={segment.id} className="border shadow-md rounded-md p-2">
                <p>Tideligere kommentar:</p>
                <span>{segment?.npsAISegmentation?.userComment}</span>
              </div>
            ))}
          </div>
        ) : (
          <CommentsSkeleton className="pt-6" />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Luk</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
