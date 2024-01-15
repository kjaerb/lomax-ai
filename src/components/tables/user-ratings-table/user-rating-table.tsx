"use client";

import { columns } from "./columns";
import useUserResponseStore from "@/stores/user-reponse-store";
import { ExportToCSVDialog } from "@/components/dialogs/export-to-csv-dialog";
import { SegmentDialog } from "@/components/dialogs/segment-dialog";
import { ImportCSVDialog } from "@/components/dialogs/import-csv-dialog";
import { ProgressStatusDialog } from "@/components/dialogs/progress-status-dialog";
import { ExportSchema } from "@/schemas/export-schema";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { UserResponse } from "@/schemas/user-comment-schema";
import { parseAISegmentString } from "@/lib/ai";

export function UserCommentTable() {
  const { userResponses } = useUserResponseStore();
  const [tableData, setTableData] = useState<UserResponse[]>(
    userResponses.map((userResponses) => userResponses.userResponse)
  );

  useEffect(() => {
    if (Object.keys(userResponses).length === 0) return;
    if (Object.keys(tableData).length !== 0) return;

    setTableData(
      userResponses.map((userResponses) => userResponses.userResponse)
    );
  }, [setTableData, userResponses, tableData]);

  const actionsDisabled = userResponses.length === 0;

  const dataToExport: ExportSchema[] = useMemo(() => {
    return userResponses.map((response) => {
      const comments = parseAISegmentString(
        response.segment?.messages?.[response?.segment?.messages.length - 1]
          ?.content || ""
      );

      return {
        CompanyAccountNo: response.userResponse.companyAccountNumber.toString(),
        CompanyName: response.userResponse.companyName,
        Rating: response.userResponse.rating,
        UserComment: response.userResponse.userComment,
        SurveySendTime: response.userResponse.surveySendTime,
        PostiveComment1: comments?.positiveComments?.[0] || "",
        PostiveComment2: comments?.positiveComments?.[1] || "",
        PostiveComment3: comments?.positiveComments?.[2] || "",
        NegativeComment1: comments?.negativeComments?.[0] || "",
        NegativeComment2: comments?.negativeComments?.[1] || "",
        NegativeComment3: comments?.negativeComments?.[2] || "",
      };
    });
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
        data={tableData}
        filtering={"companyName"}
        filteringLabel="Søg efter virksomhed"
        pagination={true}
      />
    </div>
  );
}
