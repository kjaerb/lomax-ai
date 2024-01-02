"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DragAndDrop } from "@/components/upload/drag-and-drop";
import { useRef } from "react";

interface ImportCSVDialogProps {}

export function ImportCSVDialog({}: ImportCSVDialogProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tilføj data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Tilføj data der skal segmenteres</h2>
          <DialogDescription>
            Upload en fil, eller træk en fil ind i feltet herunder.
          </DialogDescription>
        </DialogHeader>
        <DragAndDrop closeDialogRef={closeBtnRef} />
        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeBtnRef}>Luk</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
