import { revalidatePath } from "next/cache";
import { apiClient } from "@/providers/trpc-provider";
import { UserCommentSegment } from "@/schemas/segment-schema";
import { UseChatOptions, useChat } from "ai/react";

interface SegmentProps extends UseChatOptions {
  userSegment: UserCommentSegment;
}

export function useSegment({
  userSegment,
  api = "/api/ai/segment-comment",
  ...props
}: SegmentProps) {
  const { userRating, userComment } = userSegment;

  const initialMessages = {
    userRating,
    userComment,
  };

  return useChat({
    api,
    initialInput: JSON.stringify(initialMessages),
    body: { userSegment },
    ...props,
  });
}

type DeleteSegmentProps = {
  path: string;
};

export function useDeleteSegment({ path }: DeleteSegmentProps) {
  const utils = apiClient.useUtils();
  return apiClient.npsAiSegmentation.deleteAISegmentation.useMutation({
    onSuccess: async () => {
      utils.npsAiSegmentation.invalidate();
      revalidatePath(path, "page");
    },
  });
}
