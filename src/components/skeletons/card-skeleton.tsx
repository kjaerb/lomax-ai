import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

interface CardSkeletonProps {}

export function CardSkeleton({}: CardSkeletonProps) {
  return (
    <Card className="w-auto">
      <CardContent className="w-full">
        <Skeleton className="" />
      </CardContent>
    </Card>
  );
}
