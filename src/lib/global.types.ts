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
  navHistory?: Array<{ timestamp: number; nav: number }>;
  holdings?: Array<
    [string, string, string, string, number, number, number, string]
  >;
}
