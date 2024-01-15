"use client";

import { AIProgress } from "@/components/ai/ai-progress";
import useUserResponseStore from "@/stores/user-reponse-store";

interface AIProcessProps {
  index: number;
}

export function AIProcess({ index }: AIProcessProps) {
  const { getUserResponse } = useUserResponseStore();
  const state = getUserResponse(index);

  if (!state) return null;

  return (
    <AIProgress
      progress={state.segment.progress}
      className="flex justify-center items-center"
    />
  );
}
