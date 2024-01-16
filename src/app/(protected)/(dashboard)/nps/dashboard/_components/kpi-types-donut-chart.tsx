import { KPIDonutChart } from "@/components/charts/kpi-dount-chart";
import { NPSGroup, SegmentType } from "@prisma/client";

type NPSGroupQuantity = {
  type: SegmentType;
  count: number;
  name: string;
};

interface KPITypesDonutChartProps {
  data: NPSGroup[];
}

export function KPITypesDonutChart({ data }: KPITypesDonutChartProps) {
  const donutchartData = data
    .reduce((acc: NPSGroupQuantity[], item) => {
      const typeObj = acc.find((obj) => obj.type === item.type);

      if (typeObj) {
        typeObj.count += item.count;
      } else {
        acc.push({ type: item.type, count: item.count, name: item.name });
      }

      return acc;
    }, [])
    .sort((a, b) => b.type.localeCompare(a.type));

  console.log(donutchartData);
  return (
    <KPIDonutChart
      data={donutchartData}
      category={"count"}
      index={"name"}
      className="min-w-[10rem] h-full"
      colors={["green", "red"]}
    />
  );
}
