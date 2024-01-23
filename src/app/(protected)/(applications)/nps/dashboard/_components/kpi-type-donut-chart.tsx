import { KPIDonutChart } from "@/components/charts/kpi-dount-chart";
import { NPSGroup, SEGMENT_TYPE } from "@prisma/client";

interface KPITypeDonutChartProps {
  data: NPSGroup[];
  type: SEGMENT_TYPE;
  title: string;
}

export function KPITypeDonutChart({
  data,
  type,
  title,
}: KPITypeDonutChartProps) {
  const donutchartData = data
    .filter((item) => item.type === type)
    .map((item) => ({ type: item.type, count: item.count, name: item.name }));

  return (
    <KPIDonutChart
      title={title}
      data={donutchartData}
      category={"count"}
      index={"name"}
      className="min-w-[10rem]"
    />
  );
}
