import { redirect } from "next/navigation";
import FundOverview from "@/components/insight/fund-overview";
import NavHistory from "@/components/insight/nav-history";
import { Text } from "@/components/ui/text";
import { app_name, app_paths } from "@/lib/constants";
import { ShortFundData } from "@/lib/global.types";
import fundService from "@/service/fund.service";
import OverlapInfo from "@/components/insight/overlap-info";
import HoldingsInfo from "@/components/insight/holdings-info";
import HoldingAnalyzer from "@/components/insight/holding-analyzer";

interface InsightProps {
  fundA: ShortFundData;
  fundB: ShortFundData;
}

const Insight = (props: InsightProps) => {
  const { fundA, fundB } = props;

  const holdingAnalyzer = new HoldingAnalyzer(fundA, fundB);
  const holdingsAnalysis = holdingAnalyzer.analyzeOverlap();

  return (
    <div className="bg-background w-full px-4 md:px-10 py-6 mx-auto space-y-4">
      <Text lg className="font-serif" medium>
        {app_name}
      </Text>
      <div className="space-y-8">
        <div>
          <FundOverview fund={fundA} />
          <FundOverview fund={fundB} />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <OverlapInfo fundA={fundA} fundB={fundB} />
          <NavHistory fundA={fundA} fundB={fundB} />
        </div>
        <HoldingsInfo
          fundName={fundA.fund}
          holdings={holdingsAnalysis.holdingsA}
          sector={holdingsAnalysis.sectorA}
        />
        <HoldingsInfo
          fundName={fundB.fund}
          holdings={holdingsAnalysis.holdingsB}
          sector={holdingsAnalysis.sectorB}
        />
      </div>
    </div>
  );
};

Insight.displayName = "InsightPage";

export default Insight;

export async function getServerSideProps({
  query,
}: {
  query: { fundA?: string; fundB?: string };
}) {
  if (!query?.fundA || !query?.fundB) {
    redirect(app_paths.home);
  }

  const fundA = await fundService.getFundInsightByISIN(query.fundA);
  const fundB = await fundService.getFundInsightByISIN(query.fundB);

  if (!fundA || !fundB) {
    redirect(app_paths.home);
  }

  fundA.navHistory = await fundService.getNavHistoryByISIN(query.fundA);
  fundB.navHistory = await fundService.getNavHistoryByISIN(query.fundB);

  fundA.holdings = await fundService.getFundHoldingsByISIN(query.fundA);
  fundB.holdings = await fundService.getFundHoldingsByISIN(query.fundB);

  return {
    props: { fundA: fundA || null, fundB: fundB || null },
  };
}
