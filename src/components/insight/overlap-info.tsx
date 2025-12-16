import { ShortFundData } from "@/lib/global.types";
import { useMemo } from "react";
import { Text } from "../ui/text";

interface OverlapInfoProps {
  fundA: ShortFundData;
  fundB: ShortFundData;
}

export function OverlapInfo(props: OverlapInfoProps) {
  const { fundA, fundB } = props;

  // Calculate overlap based on holdings
  const overlapData = useMemo(() => {
    const holdingsA = fundA.holdings || [];
    const holdingsB = fundB.holdings || [];

    if (holdingsA.length === 0 || holdingsB.length === 0) {
      return null;
    }

    // Create a map of holding names to their percentages for fund A
    const holdingsAMap = new Map<string, number>();
    holdingsA.forEach((holding) => {
      const name = holding[1]; // Company/instrument name
      const percentage = holding[5]; // Percentage
      holdingsAMap.set(name.toLowerCase().trim(), percentage);
    });

    // Calculate overlapping percentage and track overlapping holdings
    let overlapPercentage = 0;
    const overlappingHoldings = new Set<string>();

    holdingsB.forEach((holding) => {
      const name = holding[1];
      const percentage = holding[5];
      const normalizedName = name.toLowerCase().trim();

      // If this holding exists in fund A, calculate overlap
      if (holdingsAMap.has(normalizedName)) {
        const percentageA = holdingsAMap.get(normalizedName)!;
        // Take the minimum percentage as the overlap
        overlapPercentage += Math.min(percentageA, percentage);
        overlappingHoldings.add(normalizedName);
      }
    });

    // Calculate unique percentages (holdings that don't overlap)
    let fundAUniquePercentage = 0;
    holdingsA.forEach((holding) => {
      const normalizedName = holding[1].toLowerCase().trim();
      if (!overlappingHoldings.has(normalizedName)) {
        fundAUniquePercentage += holding[5];
      }
    });

    let fundBUniquePercentage = 0;
    holdingsB.forEach((holding) => {
      const normalizedName = holding[1].toLowerCase().trim();
      if (!overlappingHoldings.has(normalizedName)) {
        fundBUniquePercentage += holding[5];
      }
    });

    return {
      overlap: overlapPercentage,
      fundAUnique: fundAUniquePercentage,
      fundBUnique: fundBUniquePercentage,
    };
  }, [fundA.holdings, fundB.holdings]);

  if (!overlapData) {
    return (
      <div className="text-muted-foreground text-sm">
        No holdings data available for overlap analysis
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Text sm className="font-mono uppercase tracking-wider">
          Portfolio Overlap
        </Text>
      </div>

      {/* Visual representation */}
      <div className="space-y-6">
        {/* Stacked horizontal bar */}
        <div className="space-y-3">
          {/* Circular Venn-like diagram */}
          <div className="relative flex items-center justify-center h-28">
            {/* Fund A Circle */}
            <div className="absolute left-1/4 size-24 rounded-full border-4 border-chart-1 bg-chart-1/20 opacity-60" />
            {/* Fund B Circle */}
            <div className="absolute right-1/4 size-24 rounded-full border-4 border-chart-2 bg-chart-2/20 opacity-60" />
            {/* Overlap indicator in center */}
            <div className="absolute z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm border rounded-lg px-3 py-2">
              <Text xs className="text-muted-foreground">
                Overlap
              </Text>
              <Text sm medium className="text-chart-3">
                {overlapData.overlap.toFixed(1)}%
              </Text>
            </div>
          </div>

          <div className="flex h-12 w-full overflow-hidden rounded-lg border">
            {overlapData.fundAUnique > 0 && (
              <div
                className="flex items-center justify-center text-xs font-medium text-white bg-chart-1/25 transition-all hover:opacity-80"
                style={{
                  width: `${overlapData.fundAUnique}%`,
                }}
              >
                {overlapData.fundAUnique > 10
                  ? `${overlapData.fundAUnique.toFixed(1)}%`
                  : ""}
              </div>
            )}
            {overlapData.overlap > 0 && (
              <div
                className="flex items-center justify-center text-xs font-medium text-white bg-chart-3/25 transition-all hover:opacity-80"
                style={{
                  width: `${overlapData.overlap}%`,
                }}
              >
                {overlapData.overlap > 10
                  ? `${overlapData.overlap.toFixed(1)}%`
                  : ""}
              </div>
            )}
            {overlapData.fundBUnique > 0 && (
              <div
                className="flex items-center justify-center text-xs font-medium text-white bg-chart-2/25 transition-all hover:opacity-80"
                style={{
                  width: `${overlapData.fundBUnique}%`,
                }}
              >
                {overlapData.fundBUnique > 10
                  ? `${overlapData.fundBUnique.toFixed(1)}%`
                  : ""}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-chart-1" />
              <Text xs className="text-muted-foreground">
                {fundA.fund} Unique:{" "}
                <span className="font-medium text-foreground">
                  {overlapData.fundAUnique.toFixed(2)}%
                </span>
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-chart-3" />
              <Text xs className="text-muted-foreground">
                Overlap:{" "}
                <span className="font-medium text-foreground">
                  {overlapData.overlap.toFixed(2)}%
                </span>
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-chart-2" />
              <Text xs className="text-muted-foreground">
                {fundB.fund} Unique:{" "}
                <span className="font-medium text-foreground">
                  {overlapData.fundBUnique.toFixed(2)}%
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverlapInfo;
