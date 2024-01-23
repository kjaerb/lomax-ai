import { revalidatePath } from "next/cache";
import { apiClient } from "@/providers/trpc-provider";
import { UserCommentSegment } from "@/schemas/segment-schema";
import { UseChatOptions, useChat } from "ai/react";
import useUserResponseStore from "@/stores/user-reponse-store";

interface SegmentProps extends UseChatOptions {
  userSegment: UserCommentSegment;
  company?: {
    companyAccountNumber: string;
    companyAccountName: string;
  };
}

export function useSegment({
  userSegment,
  api = "/api/ai/segment-comment",
  company,
  ...props
}: SegmentProps) {
  const { userRating, userComment } = userSegment;
  const { includeCompany } = useUserResponseStore();

  const initialMessages = {
    userRating,
    userComment,
  };

  return useChat({
    api,
    initialInput: JSON.stringify(initialMessages),
    body: {
      userSegment,
      company: includeCompany ? company : undefined,
    },
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
