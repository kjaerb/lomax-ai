import { NPSGroupChart } from "@/components/charts/nps-group-chart";
import { Suspense } from "react";

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <Suspense fallback={"loading..."}>
      <NPSGroupChart />
    </Suspense>
  );
}
