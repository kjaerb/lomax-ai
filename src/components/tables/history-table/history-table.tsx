import { getHistory } from "@/data/history";
import { DataTable } from "./table";
import { columns } from "./columns";

export async function HistoryTable() {
  const history = await getHistory();

  return <DataTable data={history} columns={columns} />;
}
