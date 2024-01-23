import { db } from "@/server/db";
import { KPITypeDonutChart } from "./kpi-type-donut-chart";
import { KPIDonutChart } from "@/components/charts/kpi-dount-chart";
import { SEGMENT_TYPE } from "@prisma/client";

type NPSGroupQuantity = {
  type: SEGMENT_TYPE;
  count: number;
};

interface DonutChartsProps {}

export async function DonutCharts({}: DonutChartsProps) {
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
    <div className="flex gap-4 justify-between">
      <KPIDonutChart
        data={donutchartData}
        title="Kommentarer"
        category={"count"}
        index={"type"}
        colors={["green", "red"]}
        className="min-w-[10rem] h-[10rem]"
      />
      <KPITypeDonutChart
        data={data}
        type="POSITIVE"
        title="Positive kommentarer"
      />
      <KPITypeDonutChart
        data={data}
        type="NEGATIVE"
        title="Negative kommentarer"
      />
    </div>
  );
}
