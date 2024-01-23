"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { APPLICATION_ACCESS } from "@prisma/client";

const applications: Record<APPLICATION_ACCESS, string> = {
  NPS: "NPS Segmenter",
};

interface ApplicationSelectProps {}

export function ApplicationSelect({}: ApplicationSelectProps) {
  return (
    <Select>
      <SelectTrigger className="w-fit gap-2">NPS Segmenter</SelectTrigger>
      <SelectContent>
        {Object.keys(applications).map((key) => (
          <SelectItem value={key} key={key}>
            {applications[key as keyof typeof applications]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
