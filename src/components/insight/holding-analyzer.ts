import {
  HoldingRecords,
  HoldingStats,
  ShortFundData,
} from "@/lib/global.types";

class HoldingAnalyzer {
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

  private remapHoldings(holdings: ShortFundData["holdings"]): HoldingRecords {
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
      }, {} as HoldingRecords) || {}
    );
  }

  private findSectorDistribution(
    holdings: HoldingRecords
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

  getHoldingStats(
    holdingsA: HoldingRecords,
    holdingsB: HoldingRecords
  ): HoldingStats {
    const holdingACount = Object.keys(holdingsA).length;
    const holdingBCount = Object.keys(holdingsB).length;

    let commonHoldingCount = 0;
    let weightedUniqueA = 0;
    let weightedUniqueB = 0;

    for (const key of Object.keys(holdingsA)) {
      if (holdingsB.hasOwnProperty(key)) {
        commonHoldingCount++;
      } else {
        weightedUniqueA += holdingsA[key].percentage;
      }
    }

    for (const key of Object.keys(holdingsB)) {
      if (!holdingsA.hasOwnProperty(key)) {
        weightedUniqueB += holdingsB[key].percentage;
      }
    }

    return {
      holdingACount,
      holdingBCount,
      uniqueHoldingsA: holdingACount - commonHoldingCount,
      uniqueHoldingsB: holdingBCount - commonHoldingCount,
      weightedUniqueA,
      weightedUniqueB,
      commonHoldingCount,
    };
  }

  private overlapWeightage(
    holdingsA: HoldingRecords,
    holdingsB: HoldingRecords
  ): number {
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

  public analyzeHoldings(
    fundA: ShortFundData,
    fundB: ShortFundData
  ): {
    holdingsA: HoldingRecords;
    holdingsB: HoldingRecords;
    sectorA: Map<string, number>;
    sectorB: Map<string, number>;
    holdingStats: HoldingStats;
    weightedOverlapPercentage: number;
  } {
    // Placeholder logic for analyzing holdings overlap
    if (!fundA.holdings || !fundB.holdings) {
      throw new Error("Both funds must have holdings data to analyze overlap.");
    }

    const holdingsA = this.remapHoldings(fundA.holdings);
    const holdingsB = this.remapHoldings(fundB.holdings);

    const sectorA = this.findSectorDistribution(holdingsA);
    const sectorB = this.findSectorDistribution(holdingsB);

    const holdingStats = this.getHoldingStats(holdingsA, holdingsB);
    const weightedOverlapPercentage = this.overlapWeightage(
      holdingsA,
      holdingsB
    );

    return {
      holdingsA,
      holdingsB,
      sectorA,
      sectorB,
      holdingStats,
      weightedOverlapPercentage,
    };
  }
}

const holdingAnalyzer = new HoldingAnalyzer();

export default holdingAnalyzer;
