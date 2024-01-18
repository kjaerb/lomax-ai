import { NPSGroupChart } from "@/components/charts/nps-group-chart";
import { Suspense } from "react";
import { DonutCharts } from "./_components/donut-charts";

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <div className="space-y-4">
      <Suspense fallback={"loading..."}>
        <DonutCharts />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <NPSGroupChart />
      </Suspense>
    </div>
  );
}
