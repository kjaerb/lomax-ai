import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { HistoryTable } from "@/components/tables/history-table/history-table";
import { Suspense } from "react";

interface HistoryPageProps {}

export default async function HistoryPage({}: HistoryPageProps) {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <HistoryTable />
      </Suspense>
    </div>
  );
}
