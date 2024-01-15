"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const applications: Record<string, string> = {
  npsSegmenter: "NPS Segmenter",
};

interface ApplicationSelectProps {}

export function ApplicationSelect({}: ApplicationSelectProps) {
  return (
    <Select>
      <SelectTrigger className="w-fit gap-2">NPS Segmenter</SelectTrigger>
      <SelectContent>
        {Object.keys(applications).map((key) => (
          <SelectItem value={key} key={key}>
            {applications[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
