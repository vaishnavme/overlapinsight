import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
import FundOverview from "@/components/insight/fund-overview";
import NavHistory from "@/components/insight/nav-history";
import { Text } from "@/components/ui/text";
import { app_name, app_paths } from "@/lib/constants";
import { ShortFundData } from "@/lib/global.types";
import fundService from "@/service/fund.service";
import OverlapInfo from "@/components/insight/overlap-info";
import HoldingsInfo from "@/components/insight/holdings-info";
import holdingAnalyzer from "@/components/insight/holding-analyzer";

interface InsightProps {
  fundA: ShortFundData;
  fundB: ShortFundData;
}

const Insight = (props: InsightProps) => {
  const { fundA, fundB } = props;

  const holdingsAnalysis = holdingAnalyzer.analyzeHoldings(fundA, fundB);

  return (
    <>
      <Head>
        <title>{`${fundA.fund} vs ${fundB.fund} | ${app_name}`}</title>
        <meta
          name="description"
          content={`Compare ${fundA.fund} and ${fundB.fund} based on their holdings overlap, NAV history, and sector distribution. Get insights into unique and common investments between the two funds.`}
        />
      </Head>
      <div className="bg-muted w-full px-4 md:px-10 py-6 mx-auto space-y-4">
        <Text lg className="font-serif" medium>
          {app_name}
        </Text>
        <div className="space-y-8">
          <div>
            <FundOverview fund={fundA} />
            <FundOverview fund={fundB} />
          </div>
          <div className="w-full grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-4">
            <OverlapInfo
              fundAName={fundA.fund}
              fundBName={fundB.fund}
              holdingStats={holdingsAnalysis.holdingStats}
              weightedOverlapPercentage={
                holdingsAnalysis.weightedOverlapPercentage
              }
            />
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

          <div className="pt-5 flex flex-col gap-4 sm:flex-row items-start justify-between">
            <Link href={process.env.NEXT_PUBLIC_FE_URL!}>
              <Text xs medium className="font-mono text-muted-foreground mb-2">
                {process.env.NEXT_PUBLIC_FE_URL?.replace("https://", "")}
              </Text>
            </Link>
            <Text xs className="font-mono text-muted-foreground max-w-sm">
              This data is for informational purposes only. Please cross-check
              with official fund disclosures for the most accurate and
              up-to-date holdings.
            </Text>
          </div>
        </div>
      </div>
    </>
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
