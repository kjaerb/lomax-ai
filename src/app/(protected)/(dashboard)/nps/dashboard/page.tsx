import { KPIDonutChart } from "@/components/charts/kpi-dount-chart";
import { NPSGroupChart } from "@/components/charts/nps-group-chart";
import { db } from "@/server/db";
import { NPSGroup, SegmentType } from "@prisma/client";
import { Suspense } from "react";
import { KPITypeDonutChart } from "./_components/kpi-type-donut-chart";

type NPSGroupQuantity = {
  type: SegmentType;
  count: number;
};

interface DashboardPageProps {}

export default async function DashboardPage({}: DashboardPageProps) {
  const data = await db.nPSGroup.findMany();

  const donutchartData = data
    .reduce((acc: NPSGroupQuantity[], item) => {
      const typeObj = acc.find((obj) => obj.type === item.type);

      if (typeObj) {
        typeObj.count += item.count;
      } else {
        acc.push({ type: item.type, count: item.count });
      }

      return acc;
    }, [])
    .sort((a, b) => b.type.localeCompare(a.type));

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <Suspense fallback={"loading..."}>
          <KPITypeDonutChart data={data} type="Negative" />
        </Suspense>
        <Suspense fallback={"loading..."}>
          <KPITypeDonutChart data={data} type="Positive" />
        </Suspense>
        <Suspense fallback={"loading..."}>
          <KPIDonutChart
            data={donutchartData}
            category={"count"}
            index={"type"}
            colors={["green", "red"]}
            className="min-w-[10rem] h-full"
          />
        </Suspense>
      </div>
      <Suspense fallback={"loading..."}>
        <NPSGroupChart />
      </Suspense>
    </div>
  );
}
