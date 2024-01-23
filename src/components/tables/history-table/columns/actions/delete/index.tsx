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
import { usePathname } from "next/navigation";

interface DeleteProps {
  row: UserResponseTableColumns;
}

export function Delete({ row }: DeleteProps) {
  const { userRating, userComment, surveySendTime, segments } = row;

  const [isPending, startTransition] = useTransition();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function deleteWrapper() {
    startTransition(async () => {
      toast.promise(
        new Promise(async (resolve) => {
          await deleteSegmentAction({ id: row.id, path: pathname });
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
      <DialogTrigger className="flex items-center px-2 py-2 bg-red-100 hover:bg-red-200 w-full rounded-md transition-colors">
        <Trash2 className="h-4 w-4 mr-2" />
        <span>Slet</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Slet segmentering</DialogTitle>
          <DialogDescription>
            Hvis denne segmentering slettes, vil den ikke længere være
            tilgængelig.
          </DialogDescription>
        </DialogHeader>
        <div>
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
          {segments?.map((segment) => (
            <p key={segment.id}>
              <span className="font-bold">Segment:</span> {segment.name}
            </p>
          ))}
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
