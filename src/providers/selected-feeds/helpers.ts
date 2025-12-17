import { createContext, useContext } from "react";
import type { SelectedFeedsProviderState } from "@/types/providers/selected-feeds";

const initialState: SelectedFeedsProviderState = {
  selectedFeeds: [],
  setSelectedFeeds: () => null,
};

const SelectedFeedsProviderContext =
  createContext<SelectedFeedsProviderState>(initialState);

function useSelectedFeeds() {
  const context = useContext(SelectedFeedsProviderContext);

  if (context === undefined)
    throw new Error(
      "useSelectedFeeds must be used within a SelectedFeedsProvider",
    );

  return context;
}

export { SelectedFeedsProviderContext, useSelectedFeeds, initialState };
