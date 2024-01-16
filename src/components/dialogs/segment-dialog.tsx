import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import useUserResponseStore from "@/stores/user-reponse-store";
import { useRef } from "react";

interface SegmentDialogProps {
  disabled?: boolean;
}

export function SegmentDialog({ disabled }: SegmentDialogProps) {
  const { userResponses } = useUserResponseStore();
  const closeSegmentDialogRef = useRef<HTMLButtonElement>(null);

  function segment() {
    const filteredStates = userResponses.filter(
      (response) => response.segment.shouldSegment,
    );

    filteredStates.map((userResponses) =>
      userResponses.segment.segmentTrigger?.current?.click(),
    );
    closeSegmentDialogRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Segmenter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Segmenter bruger kommentarer</h2>
        </DialogHeader>
        <p>
          Ved at accepterer, vil du segmenterer bruger kommentarene. Der vil kun
          blive segmenterer på de kommentarer som er tilvalgt.
        </p>
        <p>
          Dette vil segmentere{" "}
          {
            userResponses.filter(
              (userResponses) => userResponses.segment.shouldSegment,
            ).length
          }{" "}
          rækker
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeSegmentDialogRef} variant={"destructive"}>
              Luk
            </Button>
          </DialogClose>
          <Button onClick={segment} variant={"success"}>
            Accepter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
