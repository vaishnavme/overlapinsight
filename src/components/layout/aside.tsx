import { SearchIcon } from "lucide-react";
import SearchMutualFunds from "../search/search-mutual-funds";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const Aside = () => {
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

      <div className="space-y-8 mx-auto w-full max-w-96">
        <SearchMutualFunds
          label="Fund A"
          placeholder="Search by name, ISIN"
          // onValueChange={(value) => setFundA(value)}
        />
        <SearchMutualFunds
          label="Fund B"
          placeholder="Search by name, ISIN"
          // onValueChange={(value) => setFundB(value)}
        />
        <Button variant="primary" size="lg" className="w-full">
          <SearchIcon />
          Find overlap
        </Button>
      </div>
    </div>
  );
};

Aside.displayName = "Aside";

export default Aside;
