import { Progress, Segment } from "@/schemas/user-comment-schema";
import { HTMLAttributes, ReactNode } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { Loading } from "../ui/loading";

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
  return <div {...props}>{progressVariant[progress]}</div>;
}
