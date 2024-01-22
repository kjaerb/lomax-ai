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
import { Pencil, Trash2 } from "lucide-react";
import { UserResponseTableColumns } from "@/components/tables/history-table/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SegmentationGroups,
  UpdateSegment,
  updateSegmentSchema,
} from "@/schemas/segment-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { segmentationGroups } from "@/lib/constants/segmentation-groups";

interface UpdateProps {
  row: UserResponseTableColumns;
}

export function Update({ row }: UpdateProps) {
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

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "positiveComments",
    rules: {
      minLength: 0,
      maxLength: 3,
    },
  });

  console.log(fields);

  async function onSubmit(data: UpdateSegment) {
    console.log("update", data);
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
            <div className="flex items-center gap-4">
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
              <div>
                <p className="font-bold pb-1">Positive kommentarer</p>
                <div className="space-y-2">
                  {fields.map((field, idx) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`positiveComments.${idx}.name`}
                      render={({ field }) => (
                        <FormItem className="">
                          <div className="flex justify-between items-center gap-2">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Vælg en segmentering" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {segmentationGroups.map((segment, jdx) => (
                                  <SelectItem
                                    key={`${segment}.${jdx}`}
                                    value={segment}
                                  >
                                    {segment}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Trash2
                              className="h-6 w-6 cursor-pointer text-red-500 hover:text-red-600"
                              onClick={() => remove(idx)}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                {fields.length < 3 && (
                  <Button
                    type="button"
                    variant={"link"}
                    onClick={() =>
                      append({
                        name: "",
                      })
                    }
                  >
                    Tilføj flere
                  </Button>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Luk</Button>
              </DialogClose>
              <Button variant={"success"} type="submit">
                Opdater
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
