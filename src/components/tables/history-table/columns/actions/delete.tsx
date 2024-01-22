"use client";

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
import { Trash2 } from "lucide-react";
import { UserResponseTableColumns } from "@/components/tables/history-table/columns";
import { deleteSegmentAction } from "@/actions/ai-segmentation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

interface DeleteProps {
  row: UserResponseTableColumns;
}

export function Delete({ row }: DeleteProps) {
  const {
    companyAccountName,
    companyAccountNumber,
    userRating,
    userComment,
    surveySendTime,
    positiveComments,
    negativeComments,
  } = row;

  const [isPending, startTransition] = useTransition();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  function deleteWrapper() {
    startTransition(async () => {
      toast.promise(
        new Promise(async (resolve) => {
          await deleteSegmentAction({ id: row.id });
          resolve(closeBtnRef.current?.click());
        }),
        {
          loading: "Sletter...",
          success: "Segmentering slettet",
          error: "Kunne ikke slettes - prøv igen senere",
        }
      );
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center px-2 py-1 bg-red-100 hover:bg-red-200 w-full rounded-md transition-colors">
        <>
          <Trash2 className="h-4 w-4 mr-2" />
          <span>Slet</span>
        </>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Slet segmentering fra {companyAccountName}</DialogTitle>
          <DialogDescription>
            Hvis denne segmentering slettes, vil den ikke længere være
            tilgængelig.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            <span className="font-bold">Virksomhedsnavn:</span>{" "}
            {companyAccountName}
          </p>
          <p>
            <span className="font-bold">Virksomhedsnummer:</span>{" "}
            {companyAccountNumber}
          </p>
          <p>
            <span className="font-bold">Rating:</span> {userRating}
          </p>
          <p>
            <span className="font-bold">Bruger kommentar:</span> {userComment}
          </p>
          <p>
            <span className="font-bold">Survey send time:</span>{" "}
            {surveySendTime.toLocaleString()}
          </p>
          {positiveComments.length > 0 && (
            <p>
              <span className="font-bold">Positive kommentarer:</span>{" "}
              {positiveComments.map((comment) => comment.name).join(", ")}
            </p>
          )}
          {negativeComments.length > 0 && (
            <p>
              <span className="font-bold">Positive kommentarer:</span>{" "}
              {negativeComments.map((comment) => comment.name).join(", ")}
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" ref={closeBtnRef}>
              Luk
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            type="submit"
            disabled={isPending}
            onClick={() => deleteWrapper()}
          >
            Slet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
