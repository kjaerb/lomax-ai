"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress, progress } from "@/schemas/user-comment-schema";
import {
  progressTranslation,
  progressVariant,
} from "@/components/ai/ai-progress";
import useUserResponseStore from "@/stores/user-reponse-store";

interface ProgressStatusDialogProps {
  disabled?: boolean;
}

export function ProgressStatusDialog({ disabled }: ProgressStatusDialogProps) {
  const { userResponses } = useUserResponseStore();

  const progresses = userResponses.map(
    (userResponse) => userResponse.segment.progress,
  );

  function countOccurrences(array: Progress[]): Record<Progress, number> {
    const counts: Record<Progress, number> = {
      error: 0,
      not_started: 0,
      loading: 0,
      finished: 0,
    };

    array.forEach((item) => {
      if (counts.hasOwnProperty(item)) {
        counts[item]++;
      }
    });

    return counts;
  }

  const occurences = countOccurrences(progresses);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <div className="flex justify-between">
          {progress.map((p) => (
            <div key={p} className="flex flex-col items-center space-y-2">
              <p>{progressTranslation[p]}</p>
              {/* <span>{progressVariant[p]}</span> */}
              <span>{occurences[p]}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Luk</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
