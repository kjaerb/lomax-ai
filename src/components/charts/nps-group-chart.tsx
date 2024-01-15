import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { BarChart } from "@tremor/react";

interface NPSGroupChartProps {}

export async function NPSGroupChart({}: NPSGroupChartProps) {
  const groups = await db.nPSGroup.findMany();

  const categories = groups.map((group) => group.name);
  const data = groups.map((group) => {
    return {
      name: group.name,
      Mængde: group.count,
    };
  });

  if (!categories || !data) return null;

  return (
    <Card>
      <CardContent>
        <BarChart
          data={data}
          categories={["Mængde"]}
          index={"name"}
          yAxisWidth={48}
          showAnimation={true}
          colors={["blue"]}
          className="w-full h-[32rem] truncate bg-white"
          allowDecimals={false}
        />
      </CardContent>
    </Card>
  );
}
