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
import { apiClient } from "@/providers/trpc-provider";
import { NPSSegment } from "@prisma/client";
import { useState } from "react";

interface NPSCommentProps {
  comment: NPSSegment;
}

export function NPSComment({ comment }: NPSCommentProps) {
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
        <p>{comment.name}</p>
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
                <span>
                  {segment.npsAiSegmentationNegative?.userComment ||
                    segment.npsAiSegmentationPositive?.userComment}
                </span>
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
