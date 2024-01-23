import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { BarList } from "@tremor/react";

interface NPSGroupChartProps {}

export async function NPSGroupChart({}: NPSGroupChartProps) {
  const groups = await db.nPSGroup.findMany();

  const sortedGroups = groups
    .sort((a, b) => b.count - a.count)
    .map((group) => {
      return {
        value: group.count,
        name: group.name,
        color: group.type === "POSITIVE" ? "green" : "red",
      };
    });

  if (!sortedGroups) return null;

  return (
    <Card>
      <CardContent className="mt-6">
        <p>Overblik over kategorier</p>
        <BarList data={sortedGroups} showAnimation={true} className="pt-6" />
      </CardContent>
    </Card>
  );
}
