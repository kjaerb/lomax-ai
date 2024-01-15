import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CommentsSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function CommentsSkeleton({
  className,
  ...props
}: CommentsSkeletonProps) {
  return (
    <div {...props} className={cn("space-y-4", className)}>
      <Skeleton className="w-full h-[24px]" />
      <Skeleton className="w-full h-[24px]" />
      <Skeleton className="w-full h-[24px]" />
    </div>
  );
}
