import { Progress, Segment } from "@/schemas/user-comment-schema";
import { HTMLAttributes, ReactNode } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { Loading } from "@/components/ui/loading";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const progressVariant: Record<Progress, ReactNode> = {
  error: <XCircle className="text-red-500" />,
  finished: <CheckCircle2 className="text-green-500" />,
  loading: <Loading />,
  not_started: <></>,
};

export const progressTranslation: Record<Progress, string> = {
  error: "Fejl",
  finished: "Færdig",
  loading: "Indlæser",
  not_started: "Ikke startet",
};

interface AIProgressProps
  extends Pick<Segment, "progress">,
    HTMLAttributes<HTMLDivElement> {}

export function AIProgress({ progress, ...props }: AIProgressProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <div {...props} aria-label={progressTranslation[progress]}>
          {progressVariant[progress]}
        </div>
      </HoverCardTrigger>
      <HoverCardContent>{progressTranslation[progress]}</HoverCardContent>
    </HoverCard>
  );
}
