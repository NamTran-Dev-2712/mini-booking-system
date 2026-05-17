import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartContainer, type ChartConfig } from "~/components/ui/chart";

interface AreaChartCardProps {
  title: string;
  data: { label: string; value: number }[];
  color?: string;
  valueFormatter?: (value: number) => string;
}

export function AreaChartCard({
  title,
  data,
  color = "var(--chart-1)",
  valueFormatter,
}: AreaChartCardProps) {
  const chartConfig = {
    value: { label: title, color },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`fill-${title.replace(/\s/g, "")}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={valueFormatter}
            />
            <Tooltip
              formatter={(value) =>
                valueFormatter
                  ? valueFormatter(Number(value))
                  : Number(value).toLocaleString()
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#fill-${title.replace(/\s/g, "")})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
