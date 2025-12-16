import { useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "lucide-react";
import SearchMutualFunds from "../search/search-mutual-funds";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { app_paths } from "@/lib/constants";
import { ShortFundData } from "@/lib/global.types";

const Aside = () => {
  const router = useRouter();

  const [selectedFunds, setSelectedFunds] = useState<{
    fundA: ShortFundData | null;
    fundB: ShortFundData | null;
  }>({
    fundA: null,
    fundB: null,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFunds.fundA || !selectedFunds.fundB) return;

    router.push({
      pathname: app_paths.insight,
      query: {
        fundA: selectedFunds.fundA?.isin,
        fundB: selectedFunds.fundB?.isin,
      },
    });
  };

  return (
    <div className="lg:fixed left-0 h-full lg:w-lg p-4 lg:p-6 border-r space-y-10 lg:space-y-14">
      <div className="space-y-4 max-w-xl text-center mx-auto mt-16 lg:mt-28">
        <Text className="font-serif text-3xl" render={<h1 />}>
          Find Mutual Fund Overlap
        </Text>
        <Text className="text-muted-foreground">
          Mutual Fund Portfolio Overlap Tool identifies common stocks and
          calculates the overlap between 2 mutual fund schemes.
        </Text>
      </div>

      <form onSubmit={onSubmit} className="mx-auto w-full max-w-96 space-y-6">
        <div className="space-y-4">
          <SearchMutualFunds
            label="Fund A"
            placeholder="Search by name, ISIN"
            onValueChange={(value) =>
              setSelectedFunds((prev) => ({ ...prev, fundA: value }))
            }
          />
          <SearchMutualFunds
            label="Fund B"
            placeholder="Search by name, ISIN"
            onValueChange={(value) =>
              setSelectedFunds((prev) => ({ ...prev, fundB: value }))
            }
          />
        </div>
        <Button size="lg" type="submit" variant="primary" className="w-full">
          <SearchIcon />
          Find overlap
        </Button>
      </form>
    </div>
  );
};

Aside.displayName = "Aside";

export default Aside;
