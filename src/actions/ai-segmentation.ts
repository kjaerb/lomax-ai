"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export async function deleteSegmentAction({ id }: { id: number }) {
  await api.npsAiSegmentation.deleteAISegmentation.mutate({ id });
  revalidatePath("/nps/history", "page");
}
