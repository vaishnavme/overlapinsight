import FundOverview from "@/components/insight/fund-overview";
import { Text } from "@/components/ui/text";
import { app_name, app_paths } from "@/lib/constants";
import { ShortFundData } from "@/lib/global.types";
import fundService from "@/service/fund.service";
import { redirect } from "next/navigation";

interface InsightProps {
  fundA?: ShortFundData;
  fundB?: ShortFundData;
}

const Insight = (props: InsightProps) => {
  const { fundA, fundB } = props;

  return (
    <div className="bg-muted w-full max-w-3xl px-6 mx-auto mt-12 space-y-4 pb-6">
      <div className="pt-4">
        <Text sm className="font-serif" medium>
          {app_name}
        </Text>
      </div>
      <div>
        <FundOverview fund={fundA!} />
        <FundOverview fund={fundB!} />
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
