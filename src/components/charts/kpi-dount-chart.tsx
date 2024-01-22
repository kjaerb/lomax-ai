import { DonutChart, DonutChartProps } from "@tremor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ExtractKeysFromArray<T> = T extends Array<infer Item> ? keyof Item : never;

interface KPIDonutChartProps<TData extends Record<string, string | number>[]>
  extends DonutChartProps {
  data: TData;
  category: ExtractKeysFromArray<TData>;
  index: ExtractKeysFromArray<TData>;
  title: string;
}

export function KPIDonutChart<TData extends Record<string, string | number>[]>({
  data,
  category,
  index,
  title,
  ...props
}: KPIDonutChartProps<TData>) {
  return (
    <Card>
      <CardContent className="pt-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <DonutChart
          data={data}
          category={category}
          index={index}
          showAnimation={true}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
