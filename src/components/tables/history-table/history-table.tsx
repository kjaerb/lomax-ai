import { DataTable } from "./table";
import { columns } from "./columns";
import { api } from "@/trpc/server";

export async function HistoryTable() {
  const history = await api.userResponses.getNumUserRespones.query({
    amount: 50,
  });

  return <DataTable data={history} columns={columns} />;
}
