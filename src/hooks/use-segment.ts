import { UserCommentSegment } from "@/schemas/segment-schema";
import { UseChatOptions, useChat } from "ai/react";
import { PropsWithoutRef } from "react";

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
