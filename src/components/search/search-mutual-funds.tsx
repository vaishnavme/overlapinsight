import * as React from "react";
import { fundsAPI } from "@/lib/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxStatus,
} from "@/components/ui/combobox";
import { Text } from "../ui/text";
import { formatCurrency } from "@/lib/utils";
import { ShortFundData } from "@/lib/global.types";

interface SearchMutualFundsProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onValueChange?: (value: ShortFundData) => void;
}

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-sky/10 text-blue-500">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchMutualFunds = (props: SearchMutualFundsProps) => {
  const { label, placeholder, onValueChange } = props;

  const [searchResults, setSearchResults] = React.useState<ShortFundData[]>([]);
  const [selectedValue, setSelectedValue] =
    React.useState<ShortFundData | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [isDebouncing, setIsDebouncing] = React.useState(false);

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const trimmedSearchValue = searchValue.trim();

  const fetchFundsWithDebounce = React.useCallback(
    (query: string) => {
      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const controller = new AbortController();
      abortControllerRef.current?.abort();
      abortControllerRef.current = controller;

      // Set debouncing state
      setIsDebouncing(true);

      // Debounce API call by 300ms
      debounceTimerRef.current = setTimeout(() => {
        setIsDebouncing(false);
        startTransition(async () => {
          setError(null);

          try {
            const response = await fundsAPI.search(query);

            if (controller.signal.aborted) {
              return;
            }

            startTransition(() => {
              setSearchResults(response?.data?.funds || []);
              setError(null);
            });
          } catch (err) {
            if (controller.signal.aborted) {
              return;
            }

            startTransition(() => {
              setSearchResults([]);
              setError("Failed to fetch funds. Please try again.");
            });
          }
        });
      }, 300);
    },
    [startTransition]
  );

  const handleInputValueChange = React.useCallback(
    (nextSearchValue: string, { reason }: { reason: string }) => {
      setSearchValue(nextSearchValue);

      if (nextSearchValue === "") {
        setSearchResults([]);
        setError(null);
        setIsDebouncing(false);
        return;
      }

      if (reason === "item-press") {
        return;
      }

      fetchFundsWithDebounce(nextSearchValue);
    },
    [fetchFundsWithDebounce]
  );

  const items = React.useMemo(() => {
    if (
      !selectedValue ||
      searchResults.some((fund) => fund.isin === selectedValue.isin)
    ) {
      return searchResults;
    }
    return [...searchResults, selectedValue];
  }, [searchResults, selectedValue]);

  function getStatus() {
    if (isDebouncing || isPending) {
      return "Searching funds...";
    }

    if (error) {
      return error;
    }

    if (trimmedSearchValue === "") {
      return selectedValue ? null : "Start typing to search mutual funds...";
    }

    if (searchResults.length === 0) {
      return `No matches for "${trimmedSearchValue}".`;
    }

    return null;
  }

  function getEmptyMessage() {
    if (
      trimmedSearchValue === "" ||
      isDebouncing ||
      isPending ||
      searchResults.length > 0 ||
      error
    ) {
      return null;
    }

    return "Try a different search term.";
  }

  return (
    <Combobox
      items={items}
      filter={null}
      itemToStringLabel={(item: ShortFundData) =>
        `${item?.fund} - ${item.scheme} - ${item.subScheme}` || ""
      }
      onOpenChangeComplete={(open) => {
        if (!open && selectedValue) {
          setSearchResults([selectedValue]);
        }
      }}
      onValueChange={(nextSelectedValue) => {
        setSelectedValue(nextSelectedValue as ShortFundData | null);
        setSearchValue("");
        setError(null);
        if (nextSelectedValue && onValueChange) {
          onValueChange(nextSelectedValue || "");
        }
      }}
      onInputValueChange={handleInputValueChange}
    >
      <div className="flex flex-col gap-1.5">
        {label ? (
          <Text medium xs className="font-mono uppercase">
            {label}
          </Text>
        ) : null}
        <ComboboxInput
          placeholder={placeholder || "Search mutual funds..."}
          size="lg"
          className="w-full text-sm"
          showTrigger
          showClear
        />
        <ComboboxPopup>
          <ComboboxStatus className="font-normal">{getStatus()}</ComboboxStatus>
          <ComboboxEmpty>{getEmptyMessage()}</ComboboxEmpty>
          <ComboboxList className="space-y-1">
            {(item: ShortFundData) => (
              <ComboboxItem key={item.isin} value={item}>
                <div className="flex items-start gap-3">
                  <div
                    className="size-5 border rounded-full mt-1 shrink-0"
                    style={{
                      backgroundColor: item.hex_code,
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <Text sm className="capitalize">
                      {highlightText(item.fund, searchValue)}
                    </Text>
                    <div className="text-gray-500 dark:text-stone-400 space-y-1">
                      <div className="flex items-center gap-x-4">
                        {item?.aum ? (
                          <Text xs>
                            AUM:{" "}
                            <span className="text-primary">
                              {formatCurrency(item.aum)}
                            </span>
                          </Text>
                        ) : null}
                        {item?.isin ? (
                          <Text xs>
                            ISIN:{" "}
                            <span className="text-primary">
                              {highlightText(item.isin, searchValue)}
                            </span>
                          </Text>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-x-4">
                        {item?.scheme ? <Text xs>{item.scheme}</Text> : null}

                        {item?.subScheme ? (
                          <Text xs>{item.subScheme}</Text>
                        ) : null}

                        {item?.dividendInterval ? (
                          <Text xs className="capitalize truncate">
                            {item.dividendInterval.replace("idcw", "IDCW")}
                          </Text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </div>
    </Combobox>
  );
};

export default SearchMutualFunds;
