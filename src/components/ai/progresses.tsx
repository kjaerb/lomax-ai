"use client";

import useUserResponseStore from "@/stores/user-reponse-store";
import { Progress } from "../ui/progress";
import { useEffect, useMemo, useState } from "react";

interface ProgressesProps {}

export function Progresses({}: ProgressesProps) {
  const { userResponses } = useUserResponseStore();

  const shouldSegment = userResponses
    .map((userResponse) => userResponse.segment.shouldSegment)
    .filter((shouldSegment) => shouldSegment).length;

  const finishedSegments = userResponses
    .map((userResponse) => userResponse.segment.progress)
    .filter((progress) => progress === "finished").length;

  const progress = useMemo(() => {
    if (shouldSegment === 0) return 0;
    return (finishedSegments / shouldSegment) * 100;
  }, [finishedSegments, shouldSegment]);

  return (
    progress > 0 && (
      <div>
        <p>Progress</p>
        <Progress value={progress} className="min-w-[200px]" />
      </div>
    )
  );
}
