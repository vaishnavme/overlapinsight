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

  private remapHoldings(
    holdings: ShortFundData["holdings"]
  ): Record<string, HoldingProps> {
    return (
      holdings?.reduce((acc, curr) => {
        const nameKey: string = curr[1].toLowerCase().trim();
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

  public analyzeOverlap(): {
    holdingsA: Record<string, HoldingProps>;
    holdingsB: Record<string, HoldingProps>;
    sectorA: Map<string, number>;
    sectorB: Map<string, number>;
  } {
    const holdingsA = this.remapHoldings(this.fundA.holdings);
    const holdingsB = this.remapHoldings(this.fundB.holdings);

    const sectorA = this.findSectorDistribution(holdingsA);
    const sectorB = this.findSectorDistribution(holdingsB);

    return {
      holdingsA,
      holdingsB,
      sectorA,
      sectorB,
    };
  }
}

export default HoldingAnalyzer;
