import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { api } from "@/trpc/server";

export async function HistoryTable() {
  const history = await api.userResponses.getNumUserRespones.query({
    amount: 50,
  });
  const count = await api.userResponses.getUserResponsesCount.query();

  return (
    <>
      <DataTable
        data={history}
        columns={columns}
        totalCount={count}
        filtering="companyAccountName"
        filteringLabel="Søg efter virksomhed"
      />
    </>
  );
}
