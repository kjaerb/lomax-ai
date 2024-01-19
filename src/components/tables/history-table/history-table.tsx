import { columns } from "./columns";
import { api } from "@/trpc/server";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { ExportSchema } from "@/schemas/export-schema";
import { GenericDataTable } from "@/components/ui/data-table";

export async function HistoryTable() {
  const history = await api.npsAiSegmentation.getNumAISegmentations.query({
    amount: 50,
  });
  const count = await api.npsAiSegmentation.getAISegmentationCount.query();

  const exportData: ExportSchema[] = history.map((item) => ({
    CompanyAccountNo: item.companyAccountNumber,
    CompanyName: item.companyAccountName,
    Rating: item.userRating,
    UserComment: item.userComment,
    SurveySendTime: item.surveySendTime.toDateString(),
    PositiveComment1: item.positiveComments[0]?.name || "",
    PositiveComment2: item.positiveComments[1]?.name || "",
    PositiveComment3: item.positiveComments[2]?.name || "",
    NegativeComment1: item.negativeComments[0]?.name || "",
    NegativeComment2: item.negativeComments[1]?.name || "",
    NegativeComment3: item.negativeComments[2]?.name || "",
  }));

  return (
    <div className="space-y-2">
      <div>
        <ExportToCSVDialog
          data={exportData}
          disabled={exportData.length === 0}
        />
      </div>
      <GenericDataTable
        data={history}
        columns={columns}
        totalCount={count}
        filtering="companyAccountName"
        filteringLabel="Søg efter virksomhed"
        colVisibility={{
          userRating: false,
          id: false,
          userId: false,
          createdAt: false,
          companyAccountNumber: false,
        }}
      />
    </div>
  );
}
