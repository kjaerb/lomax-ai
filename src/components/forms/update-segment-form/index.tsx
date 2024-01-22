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
import { Pencil } from "lucide-react";
import { UserResponseTableColumns } from "@/components/tables/history-table/columns";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SegmentationGroups,
  UpdateSegment,
  updateSegmentSchema,
} from "@/schemas/segment-schema";
import { ArrayFields } from "@/components/forms/update-segment-form/array-fields";
import { toast } from "sonner";
import { updateSegmentationAction } from "@/actions/ai-segmentation";
import { usePathname } from "next/navigation";
import { useRef, useState, useTransition } from "react";

interface UpdateSegmentFormProps {
  row: UserResponseTableColumns;
}

export function UpdateSegmentForm({ row }: UpdateSegmentFormProps) {
  const {
    companyAccountName,
    id,
    userRating,
    userComment,
    positiveComments,
    negativeComments,
  } = row;

  const positiveCommentNames = positiveComments.map((comment) => {
    return { name: comment.name as SegmentationGroups };
  });
  const negativeCommentNames = negativeComments.map((comment) => {
    return { name: comment.name as SegmentationGroups };
  });

  const form = useForm<UpdateSegment>({
    resolver: zodResolver(updateSegmentSchema),
    defaultValues: {
      positiveComments: positiveCommentNames,
      negativeComments: negativeCommentNames,
    },
  });
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { control, handleSubmit } = form;

  async function updateSegment(data: UpdateSegment) {
    await updateSegmentationAction({
      id,
      data,
      path: pathname,
    });
    closeBtnRef.current?.click();
  }

  async function onSubmit(data: UpdateSegment) {
    setIsLoading(true);

    toast.promise(updateSegment(data), {
      loading: "Opdaterer segmentering",
      success: () => {
        setIsLoading(false);
        return "Segmentering opdateret";
      },
      error: (err) => {
        setIsLoading(false);
        return err.message;
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center px-2 py-2 hover:bg-gray-100 w-full rounded-md transition-colors">
        <Pencil className="h-4 w-4 mr-2" />
        <span>Opdater</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opdater segmentering</DialogTitle>
          <DialogDescription>
            Her kan du opdatere segmenteringen fra {companyAccountName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 border-b pb-2 mb-2">
              <div>
                <p className="font-bold">Kommentar</p>
                <p>{userComment}</p>
              </div>
              <div>
                <p className="font-bold">Rating</p>
                <p>{userRating}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ArrayFields
                control={control}
                name={"positiveComments"}
                title={"Positive kommentarer"}
              />
              <ArrayFields
                control={control}
                name={"negativeComments"}
                title={"Negative kommentarer"}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" ref={closeBtnRef}>
                  Luk
                </Button>
              </DialogClose>
              <Button variant={"success"} type="submit" disabled={isLoading}>
                Opdater
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
