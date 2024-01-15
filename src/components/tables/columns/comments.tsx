import { NPSSegment } from "@prisma/client";
import { NPSComment } from "./nps-comment";

interface NPSCommentsProps {
  comments: NPSSegment[];
}

export function Comments({ comments }: NPSCommentsProps) {
  return (
    <div className="space-y-2 flex flex-col">
      {comments.length > 0 &&
        comments.map((comment) => (
          <NPSComment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}
