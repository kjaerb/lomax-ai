"use client";

import { NPSGroupChart } from "@/components/charts/nps-group-chart";
import { Suspense } from "react";
import { DonutCharts } from "./_components/donut-charts";
import { DatePicker } from "@/components/ui/date-picker";

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <div className="space-y-4">
      <div>
        <DatePicker />
      </div>

      <DonutCharts />

      <NPSGroupChart />
    </div>
  );
}
