import { KPIDonutChart } from "@/components/charts/kpi-dount-chart";
import { NPSGroup, SegmentType } from "@prisma/client";

interface KPITypeDonutChartProps {
  data: NPSGroup[];
  type: SegmentType;
}

export function KPITypeDonutChart({ data, type }: KPITypeDonutChartProps) {
  const donutchartData = data
    .filter((item) => item.type === type)
    .map((item) => ({ type: item.type, count: item.count, name: item.name }));

  return (
    <KPIDonutChart
      data={donutchartData}
      category={"count"}
      index={"name"}
      className="min-w-[10rem]"
    />
  );
}
