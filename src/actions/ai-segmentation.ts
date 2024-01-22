"use server";

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
