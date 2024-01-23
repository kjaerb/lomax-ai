import { columns } from "./columns";
import { api } from "@/trpc/server";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { ExportSchema } from "@/schemas/export-schema";
import { GenericDataTable } from "@/components/ui/data-table";

export async function HistoryTable() {
  const history = await api.npsAiSegmentation.getAISegmentations.query();
  const count = await api.npsAiSegmentation.getAISegmentationCount.query();

  const exportData: ExportSchema[] = history.map((item) => {
    const positive = item.segments.filter((s) => s.type === "POSITIVE");
    const negative = item.segments.filter((s) => s.type === "NEGATIVE");

    return {
      CompanyAccountNo: "",
      CompanyName: "",
      Rating: item.userRating,
      UserComment: item.userComment,
      SurveySendTime: item.surveySendTime.toDateString(),
      PositiveComment1: positive[0]?.name || "",
      PositiveComment2: positive[1]?.name || "",
      PositiveComment3: positive[2]?.name || "",
      NegativeComment1: negative[0]?.name || "",
      NegativeComment2: negative[1]?.name || "",
      NegativeComment3: negative[2]?.name || "",
    };
  });

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
        filtering="userComment"
        filteringLabel="Søg efter virksomhed"
        colVisibility={{
          userRating: false,
          id: false,
          userId: false,
          createdAt: false,
        }}
      />
    </div>
  );
}
