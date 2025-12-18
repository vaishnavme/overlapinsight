import { InfoIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Text } from "../ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HoldingStats } from "@/lib/global.types";

interface OverlapInfoProps {
  fundAName: string;
  fundBName: string;
  weightedOverlapPercentage: number;
  holdingStats: HoldingStats;
}

const getChartConfig = (fundAName: string, fundBName: string): ChartConfig => ({
  common: {
    label: "Common Holdings",
    color: "var(--color-blue-400)",
  },
  fundA: {
    label: `Unique holding's ${fundAName}`,
    color: "var(--color-blue-500)",
  },
  fundB: {
    label: `Unique holding's ${fundBName}`,
    color: "var(--color-blue-700)",
  },
});

const OverlapInfo = (props: OverlapInfoProps) => {
  const { fundAName, fundBName, holdingStats, weightedOverlapPercentage } =
    props;

  const chartConfig = getChartConfig(fundAName, fundBName);

  const chartData = [
    {
      key: "common",
      value: weightedOverlapPercentage,
      fill: "var(--color-red-300)",
      stroke: "var(--color-red-300)",
    },
    {
      key: "fundA",
      value: holdingStats.weightedUniqueA,
      fill: "var(--color-emerald-400)",
      stroke: "var(--color-emerald-400)",
    },
    {
      key: "fundB",
      value: holdingStats.weightedUniqueB,
      fill: "var(--color-orange-300)",
      stroke: "var(--color-orange-300)",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Text
          xs
          medium
          className="font-mono uppercase tracking-wider text-muted-foreground"
        >
          Holding&apos;s Overlap
        </Text>

        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <Text xs>
              Overlap has been calculated based on common weights of stocks
              between the funds, and not on the number of common stocks.
            </Text>
          </TooltipContent>
        </Tooltip>
      </div>

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
                        {typeof value === "number" ? value.toFixed(2) : value}%
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
            fillOpacity={0.6}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-mono font-semibold"
                      >
                        {weightedOverlapPercentage.toFixed(2)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Overlap
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
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
