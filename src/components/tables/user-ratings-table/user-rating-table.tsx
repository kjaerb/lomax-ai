"use client";

import { DataTable } from "./table";
import { columns } from "./columns";
import useUserResponseStore from "@/stores/user-reponse-store";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { SegmentDialog } from "@/components/dialogs/segment-dialog";
import { ImportCSVDialog } from "@/components/dialogs/import-csv-dialog";
import { ProgressStatusDialog } from "@/components/dialogs/progress-status-dialog";

export function UserCommentTable() {
  const { userResponses } = useUserResponseStore();
  const actionsDisabled = userResponses.length === 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-4">
          <ImportCSVDialog />
          <SegmentDialog disabled={actionsDisabled} />
          <ProgressStatusDialog disabled={actionsDisabled} />
        </div>
        <div>
          <ExportToCSVDialog disabled={actionsDisabled} />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={userResponses.map((userResponse) => userResponse.userResponse)}
        filtering={"companyName"}
      />
    </div>
  );
}
