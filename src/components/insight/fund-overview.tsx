import { ShortFundData } from "@/lib/global.types";
import { Text } from "../ui/text";
import { formatCurrency } from "@/lib/utils";

interface FundOverviewProps {
  fund: ShortFundData;
}

const LabelValuePair = (props: { label: string; value: string | number }) => {
  const { label, value } = props;

  return (
    <div className="flex items-center gap-1.5 w-fit">
      <Text xs className="text-muted-foreground font-mono">
        {label}
      </Text>
      <Text xs medium>
        {value}
      </Text>
    </div>
  );
};

const FundOverview = (props: FundOverviewProps) => {
  const { fund } = props;

  return (
    <div className="flex flex-col gap-3 py-4 border-b">
      {/* Header with fund name and color */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <Text medium className="capitalize font-mono">
            {fund.fund}
          </Text>
          {fund?.isin ? (
            <LabelValuePair label="ISIN:" value={fund?.isin} />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] gap-x-4 gap-y-1 w-fit">
        {fund?.aum ? (
          <LabelValuePair label="AUM:" value={formatCurrency(fund.aum)} />
        ) : null}

        {fund?.scheme ? (
          <LabelValuePair label="Scheme:" value={fund.scheme} />
        ) : null}

        {fund?.plan ? <LabelValuePair label="Plan:" value={fund.plan} /> : null}

        {fund?.subScheme ? (
          <LabelValuePair label="Sub Scheme:" value={fund.subScheme} />
        ) : null}

        {fund?.dividendInterval ? (
          <LabelValuePair
            label="Dividend Interval:"
            value={fund.dividendInterval.replace("idcw", "IDCW")}
          />
        ) : null}
      </div>
    </div>
  );
};

FundOverview.displayName = "FundOverview";
export default FundOverview;
