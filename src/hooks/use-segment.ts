import { UserCommentSegment } from "@/schemas/segment-schema";
import { useChat } from "ai/react";

interface SegmentProps {
  userSegment: UserCommentSegment;
  api?: string;
}

export function useSegment({
  userSegment,
  api = "/api/ai/segment-comment",
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
  });
}
