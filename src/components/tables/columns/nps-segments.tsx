import { NPSSegment as NPSSegmentType } from "@prisma/client";
import { NPSSegment } from "./nps-segment";

interface NPSSegmentsProps {
  comments: NPSSegmentType[];
}

export function NPSSegments({ comments }: NPSSegmentsProps) {
  return (
    <div className="space-y-2 flex flex-col">
      {comments.length > 0 &&
        comments.map((comment) => (
          <NPSSegment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}
