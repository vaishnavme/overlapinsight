import { redirect } from "next/navigation";
import FundOverview from "@/components/insight/fund-overview";
import NavHistory from "@/components/insight/nav-history";
import { Text } from "@/components/ui/text";
import { app_name, app_paths } from "@/lib/constants";
import { ShortFundData } from "@/lib/global.types";
import fundService from "@/service/fund.service";

interface InsightProps {
  fundA?: ShortFundData;
  fundB?: ShortFundData;
}

const Insight = (props: InsightProps) => {
  const { fundA, fundB } = props;

  return (
    <div className="bg-muted w-full px-10 py-6 mx-auto space-y-4">
      <Text lg className="font-serif" medium>
        {app_name}
      </Text>
      <div className="space-y-8">
        <div>
          <FundOverview fund={fundA!} />
          <FundOverview fund={fundB!} />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <NavHistory fundA={fundA!} fundB={fundB!} />
        </div>
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

  return {
    props: { fundA: fundA || null, fundB: fundB || null },
  };
}
