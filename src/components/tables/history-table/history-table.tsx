import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { api } from "@/trpc/server";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { ExportSchema } from "@/schemas/export-schema";

export async function HistoryTable() {
  const history = await api.aiSegmentation.getNumAISegmentations.query({
    amount: 50,
  });
  const count = await api.aiSegmentation.getAISegmentationCount.query();

  const exportData: ExportSchema[] = history.map((item) => ({
    CompanyAccountNo: item.companyAccountNumber,
    CompanyName: item.companyAccountName,
    Rating: item.userRating,
    UserComment: item.userComment,
    SurverySendTime: "TODO",
    PositiveComment1: item.positiveComment[0] || "",
    PositiveComment2: item.positiveComment[1] || "",
    PositiveComment3: item.positiveComment[2] || "",
    NegativeComment1: item.negativeComment[0] || "",
    NegativeComment2: item.negativeComment[1] || "",
    NegativeComment3: item.negativeComment[2] || "",
  }));

  return (
    <div className="space-y-2">
      <div>
        <ExportToCSVDialog
          data={exportData}
          disabled={exportData.length === 0}
        />
      </div>
      <DataTable
        data={history}
        columns={columns}
        totalCount={count}
        filtering="companyAccountName"
        filteringLabel="Søg efter virksomhed"
      />
    </div>
  );
}
