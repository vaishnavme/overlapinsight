import axios from "axios";
import pick from "lodash.pick";
import { FundData, ShortFundData } from "@/lib/global.types";
import mutualFunds from "./mutualfunds";

const fundService = {
  fundServiceBaseURL: "https://staticassets.zerodha.com/coin",

  shortDTO: (data: FundData): ShortFundData => {
    const encoded_data: ShortFundData = pick(data, [
      "fund",
      "amc",
      "scheme",
      "subScheme",
      "plan",
      "dividendInterval",
      "hex_code",
    ]);

    if (data.aum) {
      encoded_data.aum = parseFloat(data.aum);
    }

    if (data.tradingSymbol) {
      encoded_data.isin = data.tradingSymbol;
    }

    return encoded_data;
  },

  getShortDataList: (data: FundData[]): ShortFundData[] => {
    return data.map((fund) => fundService.shortDTO(fund));
  },

  getFundsList: ({ query, limit }: { query?: string; limit?: number }) => {
    let list = [];

    if (query?.length) {
      list = mutualFunds.search(query).slice(0, limit);
    } else {
      list = mutualFunds.allFunds.slice(0, limit);
    }

    return fundService.getShortDataList(list);
  },

  getByISIN: (isin: string): FundData | null => {
    const fund = mutualFunds.allFunds.find(
      (fund) => fund.tradingSymbol === isin
    );
    return fund || null;
  },

  getNavHistoryByISIN: async (isin: string) => {
    try {
      const response = await axios.get(
        `${
          fundService.fundServiceBaseURL
        }/historical-nav/${isin.toUpperCase()}.json`
      );
      const navHistory = response?.data?.data || [];
      return navHistory;
    } catch (error) {
      throw error;
    }
  },

  getFundHoldingsByISIN: async (isin: string) => {
    try {
      const response = await axios.get(
        `${
          fundService.fundServiceBaseURL
        }/scheme-portfolio/${isin.toUpperCase()}.json`
      );
      const navHistory = response?.data?.data || [];
      return navHistory;
    } catch (error) {
      throw error;
    }
  },
};

export default fundService;
