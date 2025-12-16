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

const getNavHistoryData = (navHistory: ShortFundData["navHistory"]) => {
  const yearMap = new Map<
    string,
    { year: string; nav?: number; timestamp: number }
  >();

  navHistory?.forEach((item) => {
    const timestamp = item[0];
    const nav = item[1];
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear().toString();

    if (!yearMap.has(year)) {
      yearMap.set(year, { year, nav, timestamp });
    }
    const entry = yearMap.get(year)!;

    if (!entry?.timestamp || timestamp > entry?.timestamp) {
      entry.timestamp = timestamp;
    }
    yearMap.set(year, entry);
  });

  return Array.from(yearMap.values()).sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );
};

const NavHistory = (props: NavHistoryProps) => {
  const { fundA, fundB } = props;
  const chartConfig = getChartConfig(fundA, fundB);

  const chartData = useMemo(() => {
    const dataMap = new Map<
      string,
      { year: string; fundA?: number; fundB?: number }
    >();

    const navHistoryA = getNavHistoryData(fundA.navHistory);
    const navHistoryB = getNavHistoryData(fundB.navHistory);

    navHistoryA.forEach((item) => {
      dataMap.set(item.year, { year: item.year, fundA: item.nav });
    });

    navHistoryB.forEach((item) => {
      const existing = dataMap.get(item.year);
      if (existing) {
        existing.fundB = item.nav;
        dataMap.set(item.year, existing);
      } else {
        dataMap.set(item.year, { year: item.year, fundB: item.nav });
      }
    });

    return Array.from(dataMap.values()).sort(
      (a, b) => parseInt(a.year) - parseInt(b.year)
    );
  }, [fundA.navHistory, fundB.navHistory]);

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
