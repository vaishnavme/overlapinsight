import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ShortFundData } from "@/lib/global.types";
import { Text } from "../ui/text";

export const description = "An area chart with NAV history";

interface NavHistoryProps {
  fundA: ShortFundData;
  fundB: ShortFundData;
}

const getChartConfig = (
  fundA: ShortFundData,
  fundB: ShortFundData
): ChartConfig => {
  const chartConfig = {
    fundA: {
      label: fundA.fund,
      color: "var(--color-blue-400)",
    },
    fundB: {
      label: fundB.fund,
      color: "var(--color-blue-600)",
    },
  } satisfies ChartConfig;

  return chartConfig;
};

const NavHistory = (props: NavHistoryProps) => {
  const { fundA, fundB } = props;
  const chartConfig = getChartConfig(fundA, fundB);

  // Transform the data from array format to object format, grouped by year
  const chartData = useMemo(() => {
    const fundAHistory = fundA.navHistory || [];
    const fundBHistory = fundB.navHistory || [];

    // Create a map grouped by year
    const yearMap = new Map<
      string,
      { year: string; fundA?: number; fundB?: number; timestamp?: number }
    >();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fundAHistory.forEach(([timestamp, nav]) => {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear().toString();

      if (!yearMap.has(year)) {
        yearMap.set(year, { year, timestamp });
      }
      const entry = yearMap.get(year)!;
      // Update if this is a later date in the same year
      if (!entry.timestamp || timestamp > entry.timestamp) {
        entry.fundA = nav;
        entry.timestamp = timestamp;
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fundBHistory.forEach(([timestamp, nav]) => {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear().toString();

      if (!yearMap.has(year)) {
        yearMap.set(year, { year, timestamp });
      }
      const entry = yearMap.get(year)!;
      // Update if this is a later date in the same year (for this fund's data)
      if (!entry.fundB || timestamp > (entry.timestamp || 0)) {
        entry.fundB = nav;
      }
    });

    // Convert to array, sort by year, and remove timestamp field
    return Array.from(yearMap.values())
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      .map(({ year, fundA, fundB }) => ({ year, fundA, fundB }));
  }, [fundA.navHistory, fundB.navHistory]);

  if (!chartData.length) {
    return (
      <div className="space-y-6">
        <Text medium sm className="font-serif">
          Nav History
        </Text>
        <div className="text-muted-foreground text-sm">
          No NAV history data available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Text
        xs
        medium
        className="font-mono uppercase tracking-wider text-muted-foreground"
      >
        Nav History
      </Text>
      <ChartContainer config={chartConfig}>
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="font-mono text-[10px]"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, "auto"]}
            className="font-mono text-[10px]"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="fundA"
            type="natural"
            fill="var(--color-fundA)"
            fillOpacity={0.4}
            stroke="var(--color-fundA)"
          />
          <Area
            dataKey="fundB"
            type="natural"
            fill="var(--color-fundB)"
            fillOpacity={0.4}
            stroke="var(--color-fundB)"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default NavHistory;
