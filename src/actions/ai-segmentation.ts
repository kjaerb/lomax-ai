"use server";

import { UpdateSegment } from "@/schemas/segment-schema";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

type DeleteSegmentationProps = {
  id: number;
  path?: string;
};

export async function deleteSegmentAction({
  id,
  path,
}: DeleteSegmentationProps) {
  await api.npsAiSegmentation.deleteAISegmentation.mutate({ id });

  if (path) {
    revalidatePath(path, "page");
  }
}

type UpdateSegmentationProps = {
  id: number;
  data: UpdateSegment;
  path?: string;
};

export async function updateSegmentationAction({
  id,
  data,
  path,
}: UpdateSegmentationProps) {
  await api.npsAiSegmentation.updateAISegmentation.mutate({
    id,
    updateSegmentSchema: data,
  });

  if (path) {
    revalidatePath(path, "page");
  }
}
