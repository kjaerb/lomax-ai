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
  const { rating, comment } = userSegment;

  const initialMessages = {
    rating,
    comment,
  };

  return useChat({
    api,
    initialInput: JSON.stringify(initialMessages),
    body: { userSegment },
  });
}
