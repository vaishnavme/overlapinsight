export interface FundData {
  hex_code: string;
  fund: string;
  amc: string;
  scheme: string;
  subScheme: string;
  plan: string;
  dividendInterval?: string;
  aum?: string;
  tradingSymbol?: string;
}

export interface ShortFundData {
  hex_code: string;
  fund: string;
  amc: string;
  scheme: string;
  subScheme: string;
  plan: string;
  dividendInterval?: string;
  aum?: number;
  isin?: string;
  navHistory?: Array<[timestamp: number, nav: number]>;
  holdings?: Array<
    [string, string, string, string, number, number, number, string]
  >;
}

export interface HoldingStats {
  holdingACount: number;
  holdingBCount: number;
  uniqueHoldingsA: number;
  uniqueHoldingsB: number;
  commonHoldingCount: number;
  weightedUniqueA: number;
  weightedUniqueB: number;
}

export interface HoldingProps {
  name: string;
  sector: string;
  investmentType: string;
  percentage: number;
}

export type HoldingRecords = Record<string, HoldingProps>;
