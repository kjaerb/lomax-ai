import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {}

export function TableSkeleton({}: TableSkeletonProps) {
  return (
    <div className="w-auto space-y-2">
      <Skeleton className="w-[8rem] h-[3rem]" />
      <div className="flex justify-between w-full">
        <Skeleton className="w-[16rem] h-[3rem]" />
        <Skeleton className="w-[8rem] h-[3rem]" />
      </div>

      {Array.from({ length: 10 }).map((_, i) => (
        <div className="flex justify-between w-full border-b pb-2" key={i}>
          <Skeleton className="w-[10rem] h-[3rem]" />
          <Skeleton className="w-[6rem] h-[3rem]" />
          <Skeleton className="w-[6rem] h-[3rem]" />
          <Skeleton className="w-[6rem] h-[3rem]" />
          <Skeleton className="w-[6rem] h-[3rem]" />
        </div>
      ))}
    </div>
  );
}
