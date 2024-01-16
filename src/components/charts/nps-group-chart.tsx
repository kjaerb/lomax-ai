import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { BarChart } from "@tremor/react";

interface NPSGroupChartProps {}

export async function NPSGroupChart({}: NPSGroupChartProps) {
  const groups = await db.nPSGroup.findMany();

  const categories = groups.map((group) => group.name);
  const data = groups
    .sort((a, b) => a.count - b.count)
    .map((group) => {
      return {
        name: group.name,
        Antal: group.count,
      };
    });

  if (!categories || !data) return null;

  return (
    <Card>
      <CardContent>
        <BarChart
          data={data}
          categories={["Antal"]}
          index={"name"}
          yAxisWidth={48}
          showAnimation={true}
          colors={["green"]}
          className="w-full h-[32rem] truncate pt-6 bg-white"
          allowDecimals={false}
          rotateLabelX={{
            angle: 75,
            xAxisHeight: 90,
            verticalShift: 50,
          }}
        />
      </CardContent>
    </Card>
  );
}
