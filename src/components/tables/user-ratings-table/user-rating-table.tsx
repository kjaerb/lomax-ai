"use client";

import { DataTable } from "./table";
import { columns } from "./columns";
import useUserResponseStore from "@/stores/user-reponse-store";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { SegmentDialog } from "@/components/dialogs/segment-dialog";
import { ImportCSVDialog } from "@/components/dialogs/import-csv-dialog";
import { ProgressStatusDialog } from "@/components/dialogs/progress-status-dialog";
import { ExportSchema } from "@/schemas/export-schema";
import { useMemo } from "react";

export function UserCommentTable() {
  const { userResponses } = useUserResponseStore();
  const actionsDisabled = userResponses.length === 0;

  const dataToExport: ExportSchema[] = useMemo(() => {
    return userResponses.map((response) => ({
      CompanyAccountNo: response.userResponse.companyAccountNumber.toString(),
      CompanyName: response.userResponse.companyName,
      Rating: response.userResponse.rating,
      UserComment: response.userResponse.userComment,
      SurverySendTime: "TODO",
      PostiveComment1: "",
      PostiveComment2: "",
      PostiveComment3: "",
      NegativeComment1: "",
      NegativeComment2: "",
      NegativeComment3: "",
    }));
  }, [userResponses]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-4">
          <ImportCSVDialog />
          <SegmentDialog disabled={actionsDisabled} />
          <ProgressStatusDialog disabled={actionsDisabled} />
        </div>
        <div>
          <ExportToCSVDialog disabled={actionsDisabled} data={dataToExport} />
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
