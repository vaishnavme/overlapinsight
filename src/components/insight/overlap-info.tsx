import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Text } from "../ui/text";

interface OverlapInfoProps {
  fundAName: string;
  fundBName: string;
  holdingStats: {
    holdingACount: number;
    holdingBCount: number;
    uniqueHoldingsA: number;
    uniqueHoldingsB: number;
    commonHoldingCount: number;
  };
}

const getChartConfig = (fundAName: string, fundBName: string): ChartConfig => ({
  common: {
    label: "Common Holdings",
    color: "var(--color-blue-400)",
  },
  fundA: {
    label: fundAName,
    color: "var(--color-blue-500)",
  },
  fundB: {
    label: fundBName,
    color: "var(--color-blue-700)",
  },
});

const OverlapInfo = (props: OverlapInfoProps) => {
  const { fundAName, fundBName, holdingStats } = props;

  const chartConfig = getChartConfig(fundAName, fundBName);

  const chartData = [
    {
      key: "common",
      value: holdingStats.commonHoldingCount,
      fill: "var(--color-blue-400)",
    },
    {
      key: "fundA",
      value: holdingStats.uniqueHoldingsA,
      fill: "var(--color-blue-500)",
    },
    {
      key: "fundB",
      value: holdingStats.uniqueHoldingsB,
      fill: "var(--color-blue-700)",
    },
  ];

  return (
    <div className="w-full">
      <Text
        xs
        medium
        className="font-mono uppercase tracking-wider text-muted-foreground"
      >
        Holding&apos;s Overlap
      </Text>

      <ChartContainer config={chartConfig} className="max-h-64">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, props) => {
                  const config = chartConfig[name as keyof typeof chartConfig];
                  return [
                    <div key={name} className="flex items-center gap-1">
                      <div
                        className="size-2 rounded-xs"
                        style={{ backgroundColor: props.payload?.fill }}
                      />
                      <Text xs>{config?.label || name}:</Text>
                      <Text xs className="font-mono font-medium">
                        {value}
                      </Text>
                    </div>,
                  ];
                }}
              />
            }
          />

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="key"
            className="mx-auto"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            className="flex absolute left-0 bottom-0 top-0 flex-col items-start gap-2"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default OverlapInfo;
