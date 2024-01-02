import { HistoryTable } from "@/components/tables/history-table/history-table";
import { getHistory } from "@/data/history";

interface HistoryPageProps {}

export default function HistoryPage({}: HistoryPageProps) {
  return (
    <div>
      <HistoryTable />
    </div>
  );
}
