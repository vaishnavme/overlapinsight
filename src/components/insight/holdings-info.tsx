import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Text } from "../ui/text";

interface HoldingItem {
  name: string;
  sector: string;
  investmentType: string;
  percentage: number;
}

interface HoldingsInfoProps {
  holdings: Record<string, HoldingItem>;
  sector: Map<string, number>;
  fundName: string;
}

interface HoldingsListProps {
  holdings: Record<string, HoldingItem>;
}

const HoldingsList = (props: HoldingsListProps) => {
  const { holdings } = props;

  return (
    <div>
      <Table>
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="text-xs font-mono text-muted-foreground uppercase">
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Allocation</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea scrollFade className="max-h-96">
        <Table>
          <TableBody className="w-full">
            {Object.values(holdings).map((item) => (
              <TableRow key={item.name}>
                <TableCell className="truncate w-full max-w-72 sm:max-w-80">
                  {item.name}
                </TableCell>
                <TableCell className="font-mono text-xs font-medium text-center pr-4">
                  {item.percentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

const SectorDistribution = (props: { sector: Map<string, number> }) => {
  const { sector } = props;

  return (
    <div>
      <Table>
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="text-xs font-mono text-muted-foreground uppercase">
            <TableHead>Sector</TableHead>
            <TableHead className="text-right">Holding(s)</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea scrollFade className="max-h-96">
        <Table>
          <TableBody className="w-full">
            {Array.from(sector).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="truncate w-full max-w-72 sm:max-w-80">
                  {key}
                </TableCell>

                <TableCell className="font-mono text-xs font-medium text-center pr-4">
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

const HoldingsInfo = (props: HoldingsInfoProps) => {
  const { holdings, sector, fundName } = props;

  return (
    <div className="border-t pt-10 space-y-6">
      <Text
        sm
        medium
        className="font-mono uppercase tracking-wider text-muted-foreground"
      >
        {fundName}
      </Text>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HoldingsList holdings={holdings} />

        <SectorDistribution sector={sector} />
      </div>
    </div>
  );
};

HoldingsInfo.displayName = "HoldingsInfo";

export default HoldingsInfo;
