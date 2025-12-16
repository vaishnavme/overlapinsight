import { ShortFundData } from "@/lib/global.types";

interface HoldingProps {
  name: string;
  sector: string;
  investmentType: string;
  percentage: number;
}

class HoldingAnalyzer {
  private fundA;
  private fundB;

  constructor(fundA: ShortFundData, fundB: ShortFundData) {
    if (!fundA.holdings || !fundB.holdings) {
      throw new Error("Both funds must have holdings data to analyze overlap.");
    }

    this.fundA = fundA;
    this.fundB = fundB;
  }

  private normalizeCompanyName(name: string): string {
    return (
      name
        .toLowerCase()
        .trim()
        // Remove common company suffixes and variations
        .replace(
          /\s+(ltd\.?|limited|inc\.?|incorporated|corp\.?|corporation|pvt\.?|private|llc|llp)\s*$/i,
          ""
        )
        // Remove extra spaces and special characters
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    );
  }

  private remapHoldings(
    holdings: ShortFundData["holdings"]
  ): Record<string, HoldingProps> {
    return (
      holdings?.reduce((acc, curr) => {
        const nameKey: string = this.normalizeCompanyName(curr[1]);
        acc[nameKey] = {
          name: curr[1],
          sector: curr[2],
          investmentType: curr[3],
          percentage: curr[5],
        };
        return acc;
      }, {} as Record<string, HoldingProps>) || {}
    );
  }

  private findSectorDistribution(
    holdings: Record<string, HoldingProps>
  ): Map<string, number> {
    const sector = new Map<string, number>();

    Object.values(holdings).forEach((holding) => {
      const sectorFundCount = sector.get(holding.sector) || 0;

      const sectorName =
        holding?.sector?.trim().length > 0 ? holding.sector.trim() : "Others";

      sector.set(sectorName, sectorFundCount + 1);
    });

    return sector;
  }

  private overlapWeightage(
    holdingsA: Record<string, HoldingProps>,
    holdingsB: Record<string, HoldingProps>
  ) {
    let totalOverlapPercentage = 0;

    // Calculate weighted overlap by summing minimum weights of common holdings
    for (const key of Object.keys(holdingsA)) {
      if (holdingsB.hasOwnProperty(key)) {
        // Take the minimum weight for each overlapping holding
        const minWeight = Math.min(
          holdingsA[key].percentage,
          holdingsB[key].percentage
        );
        totalOverlapPercentage += minWeight;
      }
    }
    return totalOverlapPercentage;
  }

  private overallHoldingStats(
    holdingsA: Record<string, HoldingProps>,
    holdingsB: Record<string, HoldingProps>
  ) {
    const holdingACount = Object.keys(holdingsA).length;
    const holdingBCount = Object.keys(holdingsB).length;

    let commonHoldingCount = 0;

    // Count common holdings
    for (const key of Object.keys(holdingsA)) {
      if (holdingsB.hasOwnProperty(key)) {
        commonHoldingCount++;
      }
    }

    const uniqueHoldingsA = holdingACount - commonHoldingCount;
    const uniqueHoldingsB = holdingBCount - commonHoldingCount;

    // Calculate weighted overlap percentage
    const weightedOverlapPercentage = this.overlapWeightage(
      holdingsA,
      holdingsB
    );

    return {
      holdingACount,
      holdingBCount,
      uniqueHoldingsA,
      uniqueHoldingsB,
      commonHoldingCount,
      totalOverlapPercentage: weightedOverlapPercentage,
    };
  }

  public analyzeOverlap(): {
    holdingsA: Record<string, HoldingProps>;
    holdingsB: Record<string, HoldingProps>;
    sectorA: Map<string, number>;
    sectorB: Map<string, number>;
    holdingStats: {
      holdingACount: number;
      holdingBCount: number;
      uniqueHoldingsA: number;
      uniqueHoldingsB: number;
      commonHoldingCount: number;
      totalOverlapPercentage: number;
    };
  } {
    const holdingsA = this.remapHoldings(this.fundA.holdings);
    const holdingsB = this.remapHoldings(this.fundB.holdings);

    const sectorA = this.findSectorDistribution(holdingsA);
    const sectorB = this.findSectorDistribution(holdingsB);

    const holdingStats = this.overallHoldingStats(holdingsA, holdingsB);

    return {
      holdingsA,
      holdingsB,
      sectorA,
      sectorB,
      holdingStats,
    };
  }
}

export default HoldingAnalyzer;
